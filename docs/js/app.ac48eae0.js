(function(e){function t(t){for(var i,r,s=t[0],c=t[1],l=t[2],d=0,f=[];d<s.length;d++)r=s[d],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&f.push(a[r][0]),a[r]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);u&&u(t);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(i=!1)}i&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var i={},a={app:0},o=[];function r(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=i,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/gdrive-file-copier/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},1066:function(e,t,n){"use strict";n("27a1")},"145c":function(e,t,n){},"27a1":function(e,t,n){},"48d8":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"App"}},[n("router-view"),null===e.authorized?n("the-loading-screen",[e._v(" "+e._s(e.loaderStatus)+" ")]):e._e()],1)},o=[],r=n("5530"),s=n("2f62"),c=function(e,t){var n=t._c;return n("div",{staticClass:"h-screen flex items-center justify-center fixed inset-0 z-10 bg-white flex-col",attrs:{id:"TheLoadingScreen"}},[t._m(0),n("div",{staticClass:"mt-3"},[t._t("default")],2)])},l=[function(e,t){var n=t._c;return n("div",{staticClass:"spinner"},[n("div",{staticClass:"bounce1"}),n("div",{staticClass:"bounce2"}),n("div",{staticClass:"bounce3"})])}],u=(n("e746"),n("2877")),d={},f=Object(u["a"])(d,c,l,!0,null,null,null),p=f.exports,h={components:{TheLoadingScreen:p},data:function(){return{loaderStatus:""}},computed:Object(r["a"])({},Object(s["c"])({gapiStatus:function(e){return e.api.status},authorized:function(e){return e.auth.authorized}})),watch:{gapiStatus:{immediate:!0,deep:!0,handler:function(e){!0===e.gapi?(this.loaderStatus="Preparing authentication...",this.authorizeUser()):this.loaderStatus="Initializing API..."}}},methods:Object(r["a"])(Object(r["a"])({},Object(s["b"])("api",["initializeGoogleApiInstance"])),Object(s["b"])("auth",["authorizeUser"])),created:function(){this.initializeGoogleApiInstance()}},m=h,g=(n("034f"),Object(u["a"])(m,a,o,!1,null,null,null)),v=g.exports,w=n("8c4f"),b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"Home"}},[e.authorized?n("the-sign-out-button"):e._e(),n("div",{staticClass:"container"},[e._m(0),n("the-form")],1)],1)},_=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mb-6 text-center text-gray-600"},[n("h1",{staticClass:"text-3xl font-medium mb-3"},[e._v("Google Drive File Copier")]),n("p",[n("i",[e._v("Download files without limitation!")])])])}],y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"TheForm"}},[n("el-popover",{ref:"popover",attrs:{placement:"bottom",title:"Accepted Format",trigger:"focus",disabled:""!==e.copying}},[n("the-url-format-list"),n("el-form",{ref:"form",attrs:{slot:"reference",model:e.form},slot:"reference"},[n("el-alert",{directives:[{name:"show",rawName:"v-show",value:e.authIsFailed,expression:"authIsFailed"}],staticStyle:{"margin-bottom":"1rem"},attrs:{type:"error",title:"Authorization failed",description:"You have to sign in with your Google account and allow \n      our service to manage the files you want to copy. Try again by clicking\n      the paper plane icon",closable:!1,"show-icon":""}}),n("el-input",{attrs:{placeholder:"Paste the file's URL here...","prefix-icon":"el-icon-link",disabled:e.loading,id:"url-input"},nativeOn:{keyup:function(t){return(t.type.indexOf("key")||86===t.keyCode)&&t.ctrlKey?e.triggerCopyFile(t):null}},model:{value:e.form.url,callback:function(t){e.$set(e.form,"url",t)},expression:"form.url"}},[n("el-button",{attrs:{slot:"append",icon:"el-icon-s-promotion",disabled:e.loading},on:{click:e.triggerCopyFile,change:e.triggerCopyFile},slot:"append"})],1)],1)],1),null!==e.file&&""===e.copying?n("the-file",{attrs:{file:e.file,copiedDate:e.fileCopiedDate,downloadLink:e.fileCopiedDownloadLink}}):e._e(),""!==e.copying?n("div",{staticClass:"p-3 rounded bg-gray-100 mt-4 text-sm text-gray-500 text-center"},[n("i",{staticClass:"el-icon-loading"}),n("span",{staticClass:"ml-2",domProps:{innerHTML:e._s(e.copying)}})]):e._e(),e.storageQuotaExceeded?n("div",{staticClass:"mt-4"},[n("el-alert",{attrs:{title:"Storage limit exceeded, Please delete files in gdrive-file-copier-{user-id} folder and retry",type:"error","show-icon":"",closable:!1}})],1):e._e()],1)},O=[],T=n("1da1"),x=(n("0fb7"),n("450d"),n("f529")),S=n.n(x),C=(n("96cf"),n("d3b7"),n("b0c0"),n("99af"),n("caad"),n("2532"),n("1276"),n("ac1f"),n("466d"),n("bc3a")),I=n.n(C),D=n("1816"),k=n.n(D),E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mt-4",attrs:{id:"TheFile"}},[n("h2",{staticClass:"sr-only"},[e._v("File Information")]),n("hr",{staticClass:"my-6"}),n("div",{staticClass:"flex"},[n("div",{staticClass:"flex flex-shrink-0 items-stretch w-48 relative"},[n("img",{staticClass:"object-cover",attrs:{src:e.thumbnail,alt:"thumbnail"}})]),n("div",{staticClass:"flex-grow ml-3"},[n("h3",{staticClass:"font-medium text-lg text-gray-600 break-all"},[e._v(" "+e._s(e.fileName)),n("span",{staticClass:"whitespace-nowrap"},[e._v("."+e._s(e.fileExt))])]),n("div",{staticClass:"flex text-gray-500 text-sm my-2"},[n("table",{staticClass:"w-1/2"},[n("tr",[n("td",[e._v("Size")]),n("td",[e._v(": "+e._s(e.filesize(e.file.size)))])]),n("tr",[n("td",{staticClass:"pr-2",staticStyle:{width:"1px"}},[e._v("Created")]),n("td",[e._v(": "+e._s(e.createdDateFormatted))])]),n("tr",[n("td",[e._v("Copied")]),n("td",[e._v(" : "),null!==e.copiedDate?n("span",[e._v(" "+e._s(e.copiedDateFormatted)+" ")]):n("span",[e._v("...")])])])]),"videoMediaMetadata"in e.file?n("table",{staticClass:"w-1/2"},[n("tr",[n("td",[e._v("Width")]),n("td",[e._v(": "+e._s(e.file.videoMediaMetadata.width))])]),n("tr",[n("td",{staticClass:"pr-2",staticStyle:{width:"1px"}},[e._v("Dimension")]),n("td",[e._v(": "+e._s(e.file.videoMediaMetadata.height))])]),n("tr",[n("td",[e._v("Duration")]),n("td",[e._v(": "+e._s(e.videoDuration))])])]):e._e()]),""!==e.downloadLink?n("p",{staticClass:"text-sm"},[n("a",{staticClass:"text-white bg-red-400 py-2 px-4 rounded font-medium inline-block hover:bg-red-300 duration-300",attrs:{href:e.downloadLink,target:"_blank"}},[e._v(" Download ")])]):e._e()])])])},F=[],j=(n("5319"),n("cee5")),P=n.n(j),A={props:{file:{type:Object},copiedDate:{type:String},downloadLink:{type:String}},computed:{thumbnail:function(){return this.file.hasThumbnail?this.file.thumbnailLink:"//via.placeholder.com/200x200?text=No+Thumbnail"},fileName:function(){return this.file.name.replace(".".concat(this.fileExt),"")},fileExt:function(){return this.file.fileExtension},createdDateFormatted:function(){return this.formatDate(this.file.createdTime)},copiedDateFormatted:function(){return this.formatDate(this.copiedDate)},videoDuration:function(){return this.msToTime(this.file.videoMediaMetadata.durationMillis)}},methods:{filesize:P.a,formatDate:function(e){var t=new Date(e),n=new Intl.DateTimeFormat("en",{year:"numeric"}).format(t),i=new Intl.DateTimeFormat("en",{month:"long"}).format(t),a=new Intl.DateTimeFormat("en",{day:"2-digit"}).format(t);return"".concat(i," ").concat(a,", ").concat(n)},msToTime:function(e){var t=e%1e3;e=(e-t)/1e3;var n=e%60;e=(e-n)/60;var i=e%60,a=(e-i)/60;return a+":"+i+":"+n}}},z=A,U=Object(u["a"])(z,E,F,!1,null,null,null),L=U.exports,R=function(e,t){t._c;return t._m(0)},M=[function(e,t){var n=t._c;return n("ul",[n("li",[t._v(" https://drive.google.com/file/d/"),n("mark",[t._v("File ID")]),t._v("/view?usp=sharing ")]),n("li",[t._v("https://drive.google.com/uc?id="),n("mark",[t._v("File ID")])])])}],H={},$=Object(u["a"])(H,R,M,!0,null,null,null),q=$.exports,K={loading:!1,copying:"",authIsFailed:!1,file:null,fileCopiedDate:null,fileCopiedDownloadLink:"",storageQuotaExceeded:!1,form:{url:""}},N={components:{TheFile:L,TheUrlFormatList:q},data:function(){return K},computed:Object(r["a"])({},Object(s["c"])("auth",["authorized","oauthToken"])),watch:{authorized:{immediate:!0,handler:function(e){if(e){var t=window.gapi.auth2.getAuthInstance().currentUser.get(),n=t.getAuthResponse().access_token;this.setOauthToken(n)}else this.loading=!1,this.copying="",this.authIsFailed=!1,this.form={url:""}}},oauthToken:function(e){I.a.interceptors.request.use((function(t){return t.headers.Authorization="Bearer ".concat(e),t}))}},methods:Object(r["a"])({triggerCopyFile:function(){var e=this;this.storageQuotaExceeded=!1,null!==this.validate()?(this.loading=!0,this.authorized?this.copyFile(this.form.url):this.signIn().then((function(){e.authIsFailed=!1,S()({message:"Sign in success",type:"success"}),e.copyFile(e.form.url)})).catch((function(){e.authIsFailed=!0,S()({message:"Sign in canceled",type:"warning"}),e.loading=!1}))):S()({message:"URL is invalid",type:"error"})},copyFile:function(e){var t=this,n=this.getFileId(e);this.loading=!0,this.copying="<strong>Fetching file...</strong>",I()("https://www.googleapis.com/drive/v3/files/".concat(n),{params:{fields:"*"}}).then((function(e){var i=e.data,a=window.gapi.auth2.getAuthInstance().currentUser.get();t.file=i,t.copying="",t.prepareDedicatedFolder("gdrive-file-copier-".concat(a.Aa)).then((function(e){t.checkIfFileIsExists(e,i.name).then((function(e){var n=e.data;t.fileCopiedDate=(new Date).toISOString(),t.fileCopiedDownloadLink=n.webContentLink})).catch((function(i){console.log(i),I()("https://www.googleapis.com/drive/v3/files/".concat(n,"/copy"),{method:"POST",params:{fields:"*"},data:{parents:[e]}}).then((function(e){var n=e.data;t.fileCopiedDate=(new Date).toISOString(),t.fileCopiedDownloadLink=n.webContentLink})).catch((function(e){var n=e.response.data.error;"storageQuotaExceeded"===n.errors[0].reason&&(t.storageQuotaExceeded=!0)}))}))})).catch((function(e){return console.log(e)}))})).catch((function(e){console.log(e)})).finally((function(){t.loading=!1,document.querySelector("#url-input").blur()}))},checkIfFileIsExists:function(e,t){return Object(T["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.abrupt("return",new Promise((function(n,i){I()("https://www.googleapis.com/drive/v3/files",{params:{q:"name = '".concat(t,"' and '").concat(e,"' in parents"),fields:"*"}}).then((function(e){var t=e.data;0===t.files.length?i({exists:!1}):n({data:t.files[0]})}))})));case 1:case"end":return n.stop()}}),n)})))()},prepareDedicatedFolder:function(e){return Object(T["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,n){I()("https://www.googleapis.com/drive/v3/files",{params:{q:"name = '".concat(e,"'")}}).then((function(i){var a=i.data;if(0===a.files.length)window.gapi.client.drive.files.create({mimeType:"application/vnd.google-apps.folder",name:e,starred:!0,folderColorRgb:"#F56C6C"}).then((function(e){if(200==e.status){var i=e.result.id;t({folderId:i})}else n({message:"Error creating the folder",originalResponse:e})}));else{var o=a.files[0].id;t(o)}})).catch((function(e){return n({message:"error",originalResponse:e})}))})));case 1:case"end":return t.stop()}}),t)})))()},getFileId:function(e){return e.includes("google.com/file/")?e.split("google.com/file/d/")[1].split("/")[0]:k()(e).query.id},validate:function(){var e=!1;return e=this.form.url.match(/^((http(s)?:)?\/\/)?drive\.google\.com\/file\/d\/.+/),e||(e=this.form.url.match(/^((http(s)?:)?\/\/)?drive\.google\.com\/uc\?id=.+/)),e}},Object(s["b"])("auth",["signIn","setOauthToken"]))},G=N,Q=(n("1066"),Object(u["a"])(G,y,O,!1,null,null,null)),Z=Q.exports,B=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"fixed top-0 right-0 m-4",attrs:{id:"TheSignOutButton"}},[n("el-button",{attrs:{size:"small",type:"danger"},on:{click:e.signOut}},[e._v("Sign Out")])],1)},J=[],W={methods:Object(r["a"])({},Object(s["b"])("auth",["signOut"]))},Y=W,V=Object(u["a"])(Y,B,J,!1,null,null,null),X=V.exports,ee={components:{TheForm:Z,TheSignOutButton:X},computed:Object(r["a"])({},Object(s["c"])("auth",["authorized"]))},te=ee,ne=(n("a4d5"),Object(u["a"])(te,b,_,!1,null,null,null)),ie=ne.exports;i["default"].use(w["a"]);var ae=[{path:"/",name:"Home",component:ie}],oe=new w["a"]({mode:"history",base:"/gdrive-file-copier/",routes:ae}),re=oe,se={namespaced:!0,state:function(){return{status:{gapi:!1}}},mutations:{SET_LOADED:function(e,t){e.status[t]=!0}},actions:{initializeGoogleApiInstance:function(e){var t=e.commit,n=setInterval((function(){"undefined"!==typeof window.gapi&&(t("SET_LOADED","gapi"),clearInterval(n))}),50)}}},ce={namespaced:!0,state:function(){return{authorized:null,popupIsShown:!1,oauthToken:null}},mutations:{SET_AUTHORIZED_STATUS:function(e,t){e.authorized=t},SET_OAUTH_TOKEN:function(e,t){e.oauthToken=t},SET_POPUP:function(e,t){e.popupIsShown=t}},actions:{authorizeUser:function(e){var t=e.commit,n=["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],i="https://www.googleapis.com/auth/drive";window.gapi.load("client:auth2",(function(){window.gapi.client.init({clientId:"930329239171-5aco5v8spv1pvh1t7upto7g2pil6mumq.apps.googleusercontent.com",apiKey:"AIzaSyA_iHmPkgOYo5wH3AnCK2t7KWy4bfibJcE",discoveryDocs:n,scope:i}).then((function(){window.gapi.auth2.getAuthInstance().isSignedIn.listen((function(e){t("SET_AUTHORIZED_STATUS",e)})),t("SET_AUTHORIZED_STATUS",window.gapi.auth2.getAuthInstance().isSignedIn.get()),t("SET_POPUP",!1)}),(function(e){t("SET_POPUP",!1),console.log(e),S.a.error("error happened")}))}))},setOauthToken:function(e,t){var n=e.commit;n("SET_OAUTH_TOKEN",t)},signIn:function(e){return Object(T["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,n("SET_POPUP",!0),t.abrupt("return",new Promise((function(e,t){var i;window.gapi.auth2.getAuthInstance().signIn().catch((function(){i=!0})).then((function(){i?t():e(),n("SET_POPUP",!1)}))})));case 3:case"end":return t.stop()}}),t)})))()},signOut:function(e){var t=e.commit;S()("Signed out"),t("SET_AUTHORIZED_STATUS",!1),window.gapi.auth2.getAuthInstance().signOut()}}};i["default"].use(s["a"]);var le=new s["a"].Store({modules:{auth:ce,api:se}}),ue=(n("be4f"),n("896a")),de=n.n(ue),fe=(n("915d"),n("e04d")),pe=n.n(fe),he=(n("eca7"),n("3787")),me=n.n(he),ge=(n("425f"),n("4105")),ve=n.n(ge),we=(n("06f1"),n("6ac9")),be=n.n(we),_e=(n("1951"),n("eedf")),ye=n.n(_e),Oe=(n("10cb"),n("f3ad")),Te=n.n(Oe);i["default"].use(Te.a),i["default"].use(ye.a),i["default"].use(be.a),i["default"].use(ve.a),i["default"].use(me.a),i["default"].use(pe.a),i["default"].use(de.a.directive),i["default"].config.productionTip=!1,new i["default"]({router:re,store:le,render:function(e){return e(v)}}).$mount("#app")},"85ec":function(e,t,n){},a4d5:function(e,t,n){"use strict";n("48d8")},e746:function(e,t,n){"use strict";n("145c")}});
//# sourceMappingURL=app.ac48eae0.js.map