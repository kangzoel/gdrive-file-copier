<template>
  <div id="TheFile" class="mt-4">
    <h2 class="sr-only">File Information</h2>
    <hr class="my-6" />
    <div class="flex">
      <div class="flex flex-shrink-0 items-stretch w-48 relative">
        <img :src="thumbnail" alt="thumbnail" class="object-cover" />
      </div>
      <div class="flex-grow ml-3">
        <h3 class="font-medium text-lg text-gray-600 break-all">
          {{ fileName }}<span class="whitespace-nowrap">.{{ fileExt }}</span>
        </h3>
        <div class="flex text-gray-500 text-sm my-2">
          <table class="w-1/2">
            <tr>
              <td>Size</td>
              <td>: {{ filesize(file.size) }}</td>
            </tr>
            <tr>
              <td class="pr-2" style="width: 1px">Created</td>
              <td>: {{ createdDateFormatted }}</td>
            </tr>
            <tr>
              <td>Copied</td>
              <td>
                :
                <span v-if="copiedDate !== null">
                  {{ copiedDateFormatted }}
                </span>
                <span v-else>generating...</span>
              </td>
            </tr>
          </table>
          <table v-if="'videoMediaMetadata' in file" class="w-1/2">
            <tr>
              <td>Width</td>
              <td>: {{ file.videoMediaMetadata.width }}</td>
            </tr>
            <tr>
              <td class="pr-2" style="width: 1px">Dimension</td>
              <td>: {{ file.videoMediaMetadata.height }}</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>: {{ videoDuration }}</td>
            </tr>
          </table>
        </div>
        <p class="text-sm" v-if="downloadLink !== ''">
          <a
            :href="downloadLink"
            class="text-white bg-red-400 py-2 px-4 rounded font-medium inline-block hover:bg-red-300 duration-300"
            target="_blank"
          >
            Download
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import filesize from "filesize";

export default {
  props: {
    file: { type: Object },
    copiedDate: { type: String },
    downloadLink: { type: String },
  },

  computed: {
    thumbnail() {
      if (this.file.hasThumbnail) {
        return this.file.thumbnailLink;
      } else {
        return "//via.placeholder.com/200x200?text=No+Thumbnail";
      }
    },

    fileName() {
      return this.file.name.replace(`.${this.fileExt}`, "");
    },

    fileExt() {
      return this.file.fileExtension;
    },

    createdDateFormatted() {
      return this.formatDate(this.file.createdTime);
    },

    copiedDateFormatted() {
      return this.formatDate(this.copiedDate);
    },

    videoDuration() {
      return this.msToTime(this.file.videoMediaMetadata.durationMillis);
    },
  },

  methods: {
    filesize,

    formatDate(date) {
      let d = new Date(date);
      let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      let mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

      return `${mo} ${da}, ${ye}`;
    },

    msToTime(s) {
      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      return hrs + ":" + mins + ":" + secs;
    },
  },
};
</script>

<style>
</style>