<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-9 text-white">
    <q-header elevated class="bg-deep-purple-9">
      <q-toolbar>
        <q-btn
          flat dense round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        /> 
          <q-toolbar-title>
            Movie Online Shop
          </q-toolbar-title>
        
        <div class="q-pa-md">
          <WeatherCard />
        </div>

          <div class="col-md-4">
            <div class="top_1r text-end">
              <ul class="social-network social-circle mb-0" color="white" style="margin-left: 5px;">
            		  <li><a href="#" class="icoRss" @click="openSocialMedia('https://instagram.com')" title="Rss"><i class="fa fa-instagram" style="color: white;"></i></a></li>
            		  <li><a href="#" class="icoFacebook" @click="openSocialMedia('https://facebook.com')" title="Facebook"><i class="fa fa-facebook" style="color: white;"></i></a></li>
            		  <li><a href="#" class="icoTwitter" @click="openSocialMedia('https://twitter.com')" title="Twitter"><i class="fa fa-twitter" style="color: white;"></i></a></li>
            		  <li><a href="#" class="icoGoogle" @click="openSocialMedia('https://youtube.com')" title="Google +"><i class="fa fa-youtube" style="color: white;"></i></a></li>
            		  <li><a href="#" class="icoLinkedin" @click="openSocialMedia('https://linkedin.com')" title="Linkedin"><i class="fa fa-linkedin" style="color: white;"></i></a></li>
            		</ul>
               </div>
              </div>
              <q-separator />
        <q-space />
	         <div v-if="!isLogin" style="display: flex; justify-content: flex-end;" >
	           <q-btn color="deep-purple-4" @click="signCard=true" >Sign In</q-btn>
	         </div>
	           <div v-if="isLogin" style="display: flex; justify-content: flex-end;">
	             <q-btn color="secondary" @click="logout" >Logout</q-btn>
	           </div>
      </q-toolbar>

      <div v-if="isLogin && un.endsWith('s')">
          <div class="row">
              <q-tabs align="left">
                <q-route-tab to="/" label="Home" />
                <q-route-tab to="/about" label="About us" />
                <q-route-tab to="/staff" label="Staff Account" />
              </q-tabs>
              <q-tabs align="right">
                 <q-route-tab to="https://theflixer.tv/search/us" label="TV Show" />
              <q-route-tab to="https://www.netflix.com" label="Netfix" />
              <q-tabs v-model="activeTab">
                <q-route-tab
                  name="movie-news"
                  to="/movie-news"
                  label="Movie News"
                  @click="handleTabClick"
                />
              </q-tabs>
              </q-tabs>
          </div>
      </div>
      <div v-else-if="isLogin && un.endsWith('c')">
          <div class="row">
            <q-tabs align="left">
              <q-route-tab to="/" label="Home" />
              <q-route-tab to="/about" label="About us" />
              <q-route-tab to="/user" label="User Account" />
            </q-tabs>
            <q-tabs align="right">
               <q-route-tab to="https://theflixer.tv/search/us" label="TV Show" />
              <q-route-tab to="https://www.netflix.com" label="Netfix" />
              <q-tabs v-model="activeTab">
                <q-route-tab
                  name="movie-news"
                  to="/movie-news"
                  label="Movie News"
                  @click="handleTabClick"
                />
              </q-tabs>
            </q-tabs>
        </div>
      </div>
      <div v-else>
        <div class="row">
            <q-tabs align="left">
              <q-route-tab to="/" label="Home" />
              <q-route-tab to="/about" label="About us" />
            </q-tabs>
            <q-tabs align="right">
              <q-tabs v-model="activeTab">
              <q-route-tab
                name="tv-show"
                to="/tv-show" 
                label= "TV Show" 
                @click="handleTabClickThree"
                />
              <q-route-tab 
                name="popular-movie"
                to="/popular-movie" 
                label="Popular Movie" 
                @click="handleTabClickTwo"
                />
                <q-route-tab
                  name="movie-news"
                  to="/movie-news"
                  label="Movie News"
                  @click="handleTabClickOne"
                />
              </q-tabs>
            </q-tabs>
        </div>
      </div>
  </q-header>

  <div v-if="showIframeOne" style="height: 1000px;">
    <iframe :src="externalUrlOne" style="width: 100%; height: 100%; border: none;"></iframe>
  </div>

  <div v-if="showIframeTwo" style="height: 1000px;">
    <iframe :src="externalUrlTwo" style="width: 100%; height: 100%; border: none;"></iframe>
  </div>

  <div v-if="showIframeThree" style="height: 1000px;">
    <iframe :src="externalUrlThree" style="width: 100%; height: 100%; border: none;"></iframe>
  </div>
  <q-dialog v-model="signCard">
          <q-card class="my-card">
              <q-card-section>
                <q-input hint="username" v-model="un" :error="!isUNValid" error-message="Required"/>
                <q-input hint="Email Address" v-model="email" :error="!isEmailValid" error-message="Invalid email address" />
                <q-input :type="isPwd?'password':'text'" hint="Password" v-model="pwd" :error="!isPwdValid" error-message="Required">
                  <template v-slot:append>
                    <q-icon :name="isPwd? 'visibility_off': 'visibility'" class="cursor-pointer" @click="isPwd=!isPwd" />
                  </template>
                </q-input>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <p class="text-negative">{{errMsg}}</p>
              </q-card-section>
              <q-card-actions align="right">
                <div class="text-primary q-ml-sm cursor-pointer" @click="showPasswordField">Forgot Password ? </div>
                <q-btn flat color="secondary" label="Login" @click="onSubmit" />
              </q-card-actions>
          </q-card>
    </q-dialog>

    <q-dialog v-model="showPasswordDialog">
        <q-card>
          <q-card-section>
            <q-input
              :type="isKey ? 'secret key' : 'text'"
              hint="Input Secret Key"
              v-model="key"
              :error="!isKeyValid"
              error-message="Input Secret Key"
              class="key-input"
            />
            <q-input
              :type="isPwd ? 'password' : 'text'"
              hint="Reset New Password"
              v-model="newPassword"
              :error="!isPwdValid"
              error-message="Input New Password"
              class="password-input"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <p class="text-negative">{{ errMsg }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Cancel" color="primary" @click="showPasswordDialog = false" />
            <q-btn label="Confirm" color="primary" @click="forgotPassword" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-grey-8"
    >
      <q-list dark>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable target="_blank" rel="noopener" href="https://news.sky.com/entertainment">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Movie Member</q-item-label>
            <q-item-label caption>https://news.sky.com/entertainment</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://www2.solarmovie.cr/home/">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Popular Movie</q-item-label>
            <q-item-label caption>https://www2.solarmovie.cr/home/</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://tinyzonetv.to/movie">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Updated Movies</q-item-label>
            <q-item-label caption>https://tinyzonetv.to/movie</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://www.movieforums.com/community/">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Movies Forum</q-item-label>
            <q-item-label caption>https://www.movieforums.com/community/</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://www.share-talk.com/tag/cinema/">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Movies Shares</q-item-label>
            <q-item-label caption>https://www.share-talk.com/tag/cinema/</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable target="_blank" rel="noopener" href="https://www.hollywoodreporter.com/c/movies/movie-news/">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Movies Stars News</q-item-label>
            <q-item-label caption>https://www.hollywoodreporter.com/c/movies/movie-news/</q-item-label>
            <q-icon
              name="fas fa-dove"
              size="lg"
              color="grey"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

  <q-page-container>
      <router-view />
  </q-page-container>
      
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar class="bg-deep-purple-9">
        <q-toolbar-title>
          <div style="font-size: 15px;">copyright © 2013 Movie Onlien Shop. All Rights Reserved | Design by Francis Leung for PCPD Class</div>
          </q-toolbar-title>
          <div class="social-media-icons q-pl-md q-pr-md">
            <div class="circuit-container" style="align-items: center; margin-right: 20px">
              <q-icon
                name="fab fa-facebook"
                size="sm"
                margin="10 20px"
                class="icon cursor-pointer facebook"               @click="openSocialMedia('https://facebook.com')"
              />
              <q-icon
                name="fab fa-twitter"
                size="sm"
                margin="10 20px"
                class="icon cursor-pointer twitter"                @click="openSocialMedia('https://twitter.com')"
              />
              <q-icon
                name="fab fa-youtube"
                size="sm"
                margin="10 20px"
                class="icon cursor-pointer youtube"               @click="openSocialMedia('https://youtube.com')"
              />
              <q-icon
                name="fab fa-instagram"
                size="sm"
                margin="10 20px"
                class="icon cursor-pointer instagram"                @click="openSocialMedia('https://instagram.com')"
              />
              <q-icon
                name="fab fa-linkedin"
                size="sm"
                margin="10 20px"
                class="icon cursor-pointer linkedin"                @click="openSocialMedia('https://linkedin.com')"
              />
            </div>
          </div>
        </q-toolbar>
    </q-footer>  
  </q-layout>  
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import axios from 'axios'
import url from './http-common.js'
import { Buffer } from 'buffer'
import WeatherCard from './components/WeatherCard.vue';


export default {
  name: 'MyLayout',
  components: {
    WeatherCard
  },  
  setup () {
    const isLogin = ref(false)
    const leftDrawerOpen = ref(false)
    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      current: ref(1)
  }
},
data () {
    return {
      isLogin: false,
      signCard: false,
      isUNValid: true,
      isPwdValid: true,
      isValid: false,
      isKeyValid: false,
      isPwd: true,
      isKey: true,
      un: '', // UserName
      pwd: '',
      errMsg: '',
      showPasswordDialog: false,
      showDialog: false,
      email: '',
      isEmailValid: true,
      showIframeOne: false,
      showIframeTwo: false,
      showIframeThree: false,
      externalUrlOne: 'https://www.thedigitalfix.com/new-movies',
      externalUrlTwo: 'https://www2.solarmovie.cr/home/',
      externalUrlThree: 'https://kodi.tv',
    }
  },
  methods: {
    onSubmit () {
      this.isUNValid = computed(() => this.un.length > 0)
      // computed() will return true or fale
      this.isPwdValid = computed(() => this.pwd.length > 0)
      this.isValid = this.isUNValid && this.isPwdValid
      console.log(this.isValid)
      if (this.isValid) {
        // Step 1: Create token username: password
        const token = `${this.un}:${this.pwd}`
        //Pass the input username and password to other webpage
        //this.$store.commit('updateUsername', this.un)
        //this.$store.commit('updatePassword', this.pwd)
        
        // Step 2: Encode the token
        const encodedToken = Buffer.from(token).toString('base64')

        this.$store.commit('updateToken', encodedToken)

        this.encodedToken = encodedToken;
        console.log(`TokenCoded is: ${this.encodedToken}`)
        
        // Step 3: Put encodedToken to header section
        const header = {
          Authorization: `Basic ${encodedToken}`
        }
        // Step 4: Request login
        axios({
          url: `${url}/user`,
          method: 'GET',
          headers: header
        }).then((res) => {
          console.log(res.data)

          // take the key
          console.log(`${this.$store.getters.getSession}`) // $store is built inside vue.js object library for getting key
          this.$store.commit('updateSession', res.data.key) // "commit" command is update function
          console.log(this.$store.getters.getSession)

          // Send response data key to user's email address
          const emailPayload = {
            email: this.email,
            key: res.data.key,
          };

          axios
            .post(`${url}/send-email`, emailPayload)
            .then((response) => {
              console.log('Email sent successfully:', response.data);
            })
            .catch((error) => {
              console.error('Failed to send email:', error);
            });
          
          const username = res.data
            if (this.un.endsWith('c')) {
              // Redirect to User.vue
              this.$router.push('/user')
            } else if (this.un.endsWith('s')) {
              // Redirect to Staff.vue
              this.$router.push('/staff')
            } else {
              this.errMsg = 'Username without "c" or "s"'
            }
          
          this.signCard = false
          this.isLogin = true
        }).catch((err) => {
          this.errMsg = 'Invalid Information: Username without "c" or "s" or password is wrong.'
          console.log(err)
        })
      }
    }, //onSubmit
    logout () {
      this.$store.commit('updateSession', null)
      this.isLogin = false
      this.un = ''
      this.pwd = ''
      this.email = ''
      console.log(this.$store.getters.getSession)
      this.$router.push('/')
    }, //logout
    showPasswordField() {
      this.showPasswordDialog = true;
      this.signCard = false;
    },
    async forgotPassword() {
        this.isKeyValid = computed(() => this.key.length > 0)
        this.isPwdValid = computed(() => this.newPassword.length > 0);
        this.isValid = this.isKeyValid && this.isPwdValid;
        console.log("isValid: ", this.isValid);
       //Check whether or not there is new password for resetting password
        if (this.isValid) {
          //Convert secret key to string data type
          this.key = String(this.key);
          console.log(this.key)
          
          // Convert newPassword to string data type
          this.newPassword = String(this.newPassword);
          console.log(this.newPassword)
          try {
              const headers = {
                'k': `${this.key}`,
                //key: `${this.$store.getters.getSession}`
              };
              const body = {
                "password": `${this.newPassword}`,
              } //reset password to database according to the last record of the unique key to trace back the user record
              const response = await axios.put(`${url}/user/`, body,{headers});
              console.log('Password updated successfully:', response.data);
              this.showPasswordDialog = false;
              this.newPassword = '';
              alert('Password updated successfully!');
          } catch (error) {
              console.error('Error:', error);
              alert('Failed to update password. Please try again.');
            }
        } //If...then
      }, //confirmPWDChange
      closeDialog() {
        this.showDialog = false;
      },
    computed: {
      isUNValid() {
        return this.un.length > 0;
      },
      isPwdValid() {
        return this.pwd.length > 0;
      },
      isEmailValid() {
          // Basic email validation
          const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          return emailRegex.test(this.email);
      },
      isValid() {
        return this.isUNValid && this.isPwdValid &&    this.isEmailValid;
      },
    },
    handleTabClickOne() {
      this.showIframeOne = true;
    },
    handleTabClickTwo() {
      this.showIframeTwo = true;
    },
    handleTabClickThree() {
      this.showIframeThree = true;
    },
    openSocialMedia(url) {
      window.open(url, '_blank')
    },
  } //methods
}
</script>

<style>
.q-pa-md {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 10vh;
}

.password-input {
  display: true;
}

.key-input {
  display: true;
}

.center-title {
  text-align: center;
}
  
.social-media-icons {
  position: relative;
}

.circuit-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
}

.circuit-container::before {
  content: '';
  position: absolute;
  height: 1px;
  width: 100%;
  background-color: #FFFFFF;
  bottom: 50%;
  left: 0;
  z-index: 1;
}
  
.social-media-icons:hover .circuit {
  opacity: 1;
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.5s ease;
}

.facebook:hover {
  transform: translate(-50%, -50%) rotate(360deg);
}

.twitter:hover {
  transform: translate(-50%, -50%) rotate(360deg);
}

.youtube:hover {
  transform: translate(-50%, -50%) rotate(360deg);
}

.instagram:hover {
  transform: translate(-50%, -50%) rotate(360deg);
}

.linkedin:hover {
  transform: translate(-50%, -50%) rotate(360deg);
}
</style>