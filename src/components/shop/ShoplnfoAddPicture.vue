<template>
    <div>
        添加图片
        <el-upload
                :action="this.$upload"
                list-type="picture-card"
                accept=".jpg, .jpeg, .png"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :limit="3"
                :auto-upload="true">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
                <img
                        :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                        <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                      </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "ShoplnfoAddPicture",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                aa: '',
                imagename: '',
            }
        },
        methods: {
            //图片放大
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            /**
             * 上传单张图片
             * 上传后
             * @param response 返回值
             * @param file
             */
            handleAvatarSuccess(response, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.imagename = response;
                var params = new URLSearchParams();
                params.append("cId", this.$parent.$parent.shoplnfotianData.cid)
                params.append("picture", this.imagename)
                this.$axios.post("insertCommodityPrint2.action", params).then(function () {
                })
            },
            //上传前
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                this.imgname = file.name;
                var is = "";
                if (isJPG || isPNG) {
                    !isJPG ? is = isPNG : isJPG;
                } else {
                    this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return is && isLt2M;
            },
        }
    }
</script>

<style scoped>

</style>