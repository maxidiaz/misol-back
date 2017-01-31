<template lang="html">
  <div class="container">
    <div class="card">
      <div class="row">
        <div class="avatar-image-container">
          <div class="profile-img">
            <img id="avatar-image" :src="user.photoURL" alt="">
          </div>
          <label for="image-upload" class="add-avatar-btn">+</label>
        </div>
      </div>
      <input type="file" id="image-upload" style="display: none" accept="image/*" v-on:change="readURL"/>
      <pop-up-window :show="showCropper">
        <div class="crop-img-container">
          <vue-cropper
                    ref='cropper'
                    :view-mode="1"
                    :auto-crop-area="0.5"
                    :min-container-width="250"
                    :min-container-height="180"
                    :background="true"
                    :rotatable="true"
                    :aspectRatio="1"
                    :guides="false"
                    :toggleDragModeOnDblclick="false"
                    dragMode="move"
                    :src="imageForCrop">
                </vue-cropper>
        </div>
        <button type="button" style="position: absolute; top: 10px" class="btn btn-primary btn-crop" v-on:click="cropImage">Hecho</button>
        <button type="button" style="position: absolute; top: 10px; left:10px" class="btn btn-primary btn-crop" v-on:click="rotateImage()">Girar</button>
      </pop-up-window>
      <div class="row inputs-row">
        <input type="displayName" v-model="user.displayName" class="form-control" placeholder="Nombre de usuario"/>
      </div>
      <div class="row inputs-row">
        <input type="email" v-model="user.email" class="form-control" placeholder="E-mail"/>
      </div>
      <div class="row inputs-row">
        <input type="password" v-model="user.password" class="form-control" placeholder="Password"/>
      </div>
      <div class="row inputs-row">
        <button type="button" v-on:click="signup" class="btn btn-primary btn-signup">CREAR USUARIO</button>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../../utils/Authentication'
import PopUpWindow from '../../components/PopUpWindow.vue'
import Cropper from 'cropperjs'
import VueCropper from 'vue-cropperjs'
import Utils from '../../utils/Utils'

export default {
  name: 'sign-up',
  data () {
    return {
      showCropper: false,
      imageForCrop: '',
      user: {
        email: '',
        password: '',
        displayName: '',
        photoURL: '/assets/profile_avatar_default.png',
      }
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    signup () {
      const self = this
      if (this.user.photoURL != '/assets/profile_avatar_default.png') {
        this.$showSpinner()
        Auth.uploadAvatar(Utils.dataUriToBlob(this.user.photoURL),
          avatarURL => {
            Utils.urlShortener(avatarURL, shortAvatarURL => {
              console.log(shortAvatarURL)
              self.user.photoURL = shortAvatarURL
              Auth.signUp(self.user, signupUser => {
                console.log(signupUser)
                self.$router.push('/')
                self.$hideSpinner()
              }, error => {
                console.log('ppeppepepepe')
                self.$hideSpinner()
                self.$displayDialog('Oops!', 'Hubo un error en la creación de usuario. Por favor volvé a intentar.')
              })
            })
          }, error => {
            console.log('papapapappa')
            self.$hideSpinner()
            self.$displayDialog('Oops!', 'Hubo un error en la creación de usuario. Por favor volvé a intentar.')
          })
      } else {
        self.$displayDialog('Falta la foto!', 'Elegí una foto para tu usuario')
      }
    },
    readURL(e) {
      const self = this
      let input = e.target

      if (input.files && input.files[0]) {
        let reader = new FileReader()
        reader.onload = function (e) {
          console.log(e.target.result)
          var blob = new Blob([event.target.result]) // create blob...
          window.URL = window.URL || window.webkitURL
          var blobURL = window.URL.createObjectURL(blob); // and get it's URL

          // helper Image object
          var image = new Image()
          image.src = blobURL
          image.onload = function () {
            let resizedImg = self.resizeMe(image)
            self.imageForCrop = resizedImg
            self.showCropper = true
          }
        }
        reader.readAsArrayBuffer(input.files[0])
      }
    },
    cropImage() {
      this.showCropper = false
      this.user.photoURL = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    rotateImage() {
      console.log('rotate')
      console.log(this.$refs.cropper)
      this.$refs.cropper.rotate(45)
    },
    resizeMe(img) {

        let canvas = document.createElement('canvas')

        let width = img.width
        let height = img.height
        let max_width = window.innerWidth * 0.9
        let max_height = window.innerHeight * 0.9

        // calculate the width and height, constraining the proportions
        if (width > height) {
          if (width > max_width) {
            //height *= max_width / width;
            height = Math.round(height *= max_width / width)
            width = max_width
          }
        } else {
          if (height > max_height) {
            //width *= max_height / height
            width = Math.round(width *= max_height / height)
            height = max_height
          }
        }

        // resize the canvas and draw the image data into it
        canvas.width = width
        canvas.height = height
        var ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0, width, height)

        return canvas.toDataURL("image/png",0.7) // get the data from canvas as 70% JPG (can be also PNG, etc.)

      }
  },
  components: {
    PopUpWindow,
    VueCropper
  }
}
</script>

<style lang="css" scoped>
.inputs-row {
  margin: 12px 0px 0 0px;
}

.avatar-image-container {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
  width: 150px;
  position: relative;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #CCC;
  box-shadow: 2px 4px 2px #CCC;
  overflow: hidden;
}

.profile-img img {
  width: 100%;
  height: 100%;
}

.btn-signup {
  width: 100%;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.add-avatar-btn {
  position: absolute;
  width: 50px;
  height: 50px;
  background: #337ab7;
  color: white;
  font-size: 50px;
  line-height: 50px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  border: 1px solid #CCC;
  box-shadow: 2px 4px 2px #CCC;
  font-weight: 100;
}
.btn-crop {
  position: absolute;
  top: 5px;
  right: 5px;
}

.crop-img-container {
  width: 100%;
text-align: center;
background-color: #f7f7f7;    min-height: 200px;
    max-height: 469px;
    margin-bottom: 16px;
}
</style>
