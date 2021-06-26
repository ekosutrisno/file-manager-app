<template>
  <div>
    <Pdf v-if="extention === '.pdf'" class="w-10 h-10" />
    <Csv v-else-if="extention === '.csv'" class="w-10 h-10" />
    <Txt v-else-if="extention === '.txt'" class="w-10 h-10" />
    <Png v-else-if="extention === '.png'" class="w-10 h-10" />
    <Svg v-else-if="extention === '.svg'" class="w-10 h-10" />
    <Json v-else-if="extention === '.json'" class="w-10 h-10" />
    <Iso v-else-if="extention === '.iso'" class="w-10 h-10" />
    <Exe v-else-if="extention === '.exe'" class="w-10 h-10" />
    <Mp3 v-else-if="extention === '.mp3'" class="w-10 h-10" />
    <Jsc v-else-if="extention === '.js' ||extention === '.ts'" class="w-10 h-10" />
    <Mp4 v-else-if="extention === '.mp4' ||extention === '.avi'" class="w-10 h-10" />
    <Xls v-else-if="extention === '.xls' ||extention === '.xlsx'" class="w-10 h-10" />
    <Ppt v-else-if="extention === '.ppt' ||extention === '.pptx'" class="w-10 h-10" />
    <Doc v-else-if="extention === '.doc' ||extention === '.docx'" class="w-10 h-10" />
    <Zip v-else-if="extention === '.zip' || extention === '.rar' || extention === '.tar'" class="w-10 h-10" />
    <Jpg v-else-if="extention === '.jpg' ||extention === '.jpeg' ||extention === '.webp' ||extention === '.gif'" class="w-10 h-10" />
    <Gen v-else class="w-10 h-10" />
 </div>
</template>

<script>
import Jpg from './svg/file/Jpg.vue';
import Json from './svg/file/Json.vue';
import Pdf from "./svg/file/Pdf.vue";
import Zip from './svg/file/Zip.vue';
import Svg from './svg/file/Svg.vue';
import Doc from './svg/file/Doc.vue';
import Png from './svg/file/Png.vue';
import Txt from './svg/file/Txt.vue';
import Xls from './svg/file/Xls.vue';
import Csv from './svg/file/Csv.vue';
import Ppt from './svg/file/Ppt.vue';
import Jsc from './svg/file/Jsc.vue';
import Gen from './svg/file/Gen.vue';
import Mp3 from './svg/file/Mp3.vue';
import Mp4 from './svg/file/Mp4.vue';
import Iso from './svg/file/Iso.vue';
import Exe from './svg/file/Exe.vue';
export default {
  components: {Gen, Pdf, Jpg, Json, Zip, Svg, Doc, Png, Txt, Xls, Csv, Ppt, Jsc, Mp3, Mp4, Iso, Exe },
  props: {
    extention: {
      type: String,
      required: true,
      default: "",
    },
  },
  setup() {
    return {};
  },
};
</script>