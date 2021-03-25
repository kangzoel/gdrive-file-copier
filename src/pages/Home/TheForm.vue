<template>
  <div id="TheForm">
    <el-popover
      ref="popover"
      placement="bottom"
      title="Accepted Format"
      trigger="focus"
      :disabled="copying !== ''"
    >
      <the-url-format-list />
      <el-form ref="form" :model="form" slot="reference">
        <el-alert
          v-show="authIsFailed"
          type="error"
          title="Authorization failed"
          description="You have to sign in with your Google account and allow 
        our service to manage the files you want to copy. Try again by clicking
        the paper plane icon"
          :closable="false"
          style="margin-bottom: 1rem"
          show-icon
        />

        <el-input
          v-model="form.url"
          placeholder="Paste the file's URL here..."
          prefix-icon="el-icon-link"
          @keyup.native.ctrl.86="triggerCopyFile"
          :disabled="loading"
          id="url-input"
        >
          <el-button
            slot="append"
            icon="el-icon-s-promotion"
            @click="triggerCopyFile"
            @change="triggerCopyFile"
            :disabled="loading"
          />
        </el-input>
      </el-form>
    </el-popover>

    <the-file
      :file="file"
      v-if="file !== null && copying === ''"
      :copiedDate="fileCopiedDate"
      :downloadLink="fileCopiedDownloadLink"
    />

    <div
      class="p-3 rounded bg-gray-100 mt-4 text-sm text-gray-500 text-center"
      v-if="copying !== ''"
    >
      <i class="el-icon-loading"></i>
      <span class="ml-2" v-html="copying"></span>
    </div>

    <div class="mt-4" v-if="storageQuotaExceeded">
      <el-alert
        title="Storage limit exceeded, Please delete files in gdrive-file-copier-{user-id} folder and retry"
        type="error"
        show-icon
        :closable="false"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Message } from "element-ui";
import axios from "axios";
import parse from "url-parse";
import TheFile from "./TheFile.vue";
import TheUrlFormatList from "./TheUrlFormatList";

const initialData = {
  loading: false,
  copying: "",
  authIsFailed: false,
  file: null,
  fileCopiedDate: null,
  fileCopiedDownloadLink: "",
  storageQuotaExceeded: false,
  form: {
    url: "",
  },
};

export default {
  components: {
    TheFile,
    TheUrlFormatList,
  },

  data: () => initialData,

  computed: {
    ...mapState("auth", ["authorized", "oauthToken"]),
  },

  watch: {
    authorized: {
      handler: function (isSignedIn) {
        if (isSignedIn == false) {
          this.loading = false;
          this.copying = "";
          this.authIsFailed = false;
          this.file = null;
          this.fileCopiedDate = null;
          this.fileCopiedDownloadLink = "";
          this.storageQuotaExceeded = false;
          this.form = {
            url: "",
          };

          this.setOauthToken(null);
        } else {
          const user = window.gapi.auth2.getAuthInstance().currentUser.get();
          const oauthToken = user.getAuthResponse().access_token;

          if (typeof oauthToken !== "undefined") {
            this.setOauthToken(oauthToken);
          }
        }
      },
    },

    oauthToken: function (newVal) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${newVal}`;

        return config;
      });
    },
  },

  methods: {
    triggerCopyFile() {
      this.storageQuotaExceeded = false;

      if (this.validate() !== null) {
        this.loading = true;

        if (!this.authorized) {
          this.signIn()
            .then(() => {
              this.authIsFailed = false;

              Message({
                message: "Sign in success",
                type: "success",
              });

              this.copyFile(this.form.url);
            })
            .catch(() => {
              this.authIsFailed = true;

              Message({
                message: "Sign in canceled",
                type: "warning",
              });

              this.loading = false;
            });
        } else {
          this.copyFile(this.form.url);
        }
      } else {
        Message({
          message: "URL is invalid",
          type: "error",
        });
      }
    },

    copyFile(url) {
      const fileId = this.getFileId(url);

      this.loading = true;
      this.copying = "<strong>Fetching file...</strong>";

      axios(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        params: { fields: "*" },
      })
        .then(({ data }) => {
          const user = window.gapi.auth2.getAuthInstance().currentUser.get();

          this.file = data;
          this.copying = "";

          this.prepareDedicatedFolder(`gdrive-file-copier-${user.Aa}`)
            .then((res) => {
              this.checkIfFileIsExists(res, data.name)
                // file is exists
                .then(({ data }) => {
                  this.fileCopiedDate = new Date().toISOString();
                  this.fileCopiedDownloadLink = data.webContentLink;
                })
                // file is not exists
                .catch((msg) => {
                  console.error("emasdk", msg);

                  axios(
                    `https://www.googleapis.com/drive/v3/files/${fileId}/copy`,
                    {
                      method: "POST",
                      params: { fields: "*" },
                      data: { parents: [res] },
                    }
                  )
                    .then(({ data }) => {
                      this.fileCopiedDate = new Date().toISOString();
                      this.fileCopiedDownloadLink = data.webContentLink;
                    })
                    .catch((err) => {
                      let error = err.response.data.error;

                      if (error.errors[0].reason === "storageQuotaExceeded") {
                        this.storageQuotaExceeded = true;
                      }
                    });
                });
            })
            .catch((err) => console.error("12312", err)); // prepareDedicatedFolder
        })
        .catch((err) => {
          console.error("sadwd", err);
        })
        .finally(() => {
          this.loading = false;
          document.querySelector("#url-input").blur();
        });
    },

    async checkIfFileIsExists(folderId, fileName) {
      return new Promise((resolve, reject) => {
        axios("https://www.googleapis.com/drive/v3/files", {
          params: {
            q: `name = '${fileName}' and '${folderId}' in parents`,
            fields: "*",
          },
        }).then(({ data }) => {
          if (data.files.length === 0) {
            reject({ exists: false });
          } else {
            resolve({ data: data.files[0] });
          }
        });
      });
    },

    async prepareDedicatedFolder(folderName) {
      return new Promise((resolve, reject) => {
        axios("https://www.googleapis.com/drive/v3/files", {
          params: { q: `name = '${folderName}'` },
        })
          .then(({ data }) => {
            if (data.files.length === 0) {
              window.gapi.client.drive.files
                .create({
                  mimeType: "application/vnd.google-apps.folder",
                  name: folderName,
                  starred: true,
                  folderColorRgb: "#F56C6C",
                })
                .then(function (response) {
                  if (response.status == 200) {
                    const folderId = response.result.id;

                    resolve({ folderId });
                  } else {
                    reject({
                      message: "Error creating the folder",
                      originalResponse: response,
                    });
                  }
                });
            } else {
              const folderId = data.files[0].id;

              resolve(folderId);
            }
          })
          .catch((err) => reject({ message: "error", originalResponse: err }));
      });
    },

    getFileId(url) {
      if (url.includes("google.com/file/")) {
        return url.split("google.com/file/d/")[1].split("/")[0];
      } else {
        return parse(url).query.id;
      }
    },

    validate() {
      let isValid = false;

      isValid = this.form.url.match(
        /^((http(s)?:)?\/\/)?drive\.google\.com\/file\/d\/.+/
      );

      if (!isValid) {
        isValid = this.form.url.match(
          /^((http(s)?:)?\/\/)?drive\.google\.com\/uc\?id=.+/
        );
      }

      return isValid;
    },

    ...mapActions("auth", ["signIn", "setOauthToken"]),
  },
};
</script>

<style>
#copying-alert {
  margin-top: 1rem;
}
</style>