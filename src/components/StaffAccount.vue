<template>
  <h5>Staff Information</h5>

  <div v-if="!error">
    <q-card class="UserCard">
      <q-card-section>
        <q-input v-model="lastname" label="Last Name:" color="black" input-class="white-input" :style="{ width: '500px' }" dense />
        <q-input color="black" v-model="firstname" label="First Name:" input-class="white-input" :style="{ width: '500px' }" dense />
        <q-input v-model="valid" label="Date of Registration:" color="black" input-class="white-input" :style="{ width: '500px' }" dense />
        <q-input v-model="type" label="Type of the user (1 - staff; 2 - customer):" color="black" input-class="white-input" :style="{ width: '500px' }" dense />
        <q-btn label="Update" color="primary" @click="updateUser"></q-btn>
        <q-btn color="black" @click="$router.replace('/staff')">Cancel</q-btn>

        <q-btn label="Change Password" color="secondary" @click="showPasswordField"></q-btn>

      <q-dialog v-model="showPasswordDialog">
        <q-card>
          <q-card-section>
            <q-input
              :type="isPwd ? 'password' : 'text'"
              hint="Reset New Password"
              v-model="newPassword"
              :error="!isPwdValid"
              error-message="Required"
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
            <q-btn label="Confirm" color="primary" @click="confirmPWDChange" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      
      </q-card-section>
    </q-card>
  </div>

  <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <q-dialog-message v-if="success">
            Successfully saved user data!
          </q-dialog-message>
          <q-dialog-message v-else>
            Error saving user data. Please try again later.
          </q-dialog-message>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="OK" color="primary" @click="closeDialog" />
        </q-card-actions>
      </q-card>
  </q-dialog>
  
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import url from '../http-common.js';
import { Buffer } from 'buffer';

export default {
  data() {
    return {
      isPwdValid: true,
      isPwd: true,
      showPasswordDialog: false,
      newPassword: '',
      user: null,
      staffData: null,
      success: false,
      showDialog: false,
      lastname: '', // Data property for Last Name
      firstname: '', // Data property for First Name
      valid: '', // Data property for Date of Registration
      type: '', // Data property for Type of the user
      errMsg: '',
    };
  },
  methods: {
    updateUser() {
      const session = this.$store.getters.getSession;
      const sessionString = session.toString();

      const valid = this.valid
      const validString = valid.toString();

      const lastName = this.lastname
      const lastNameString = lastName.toString();

      const firstName = this.firstname
      const firstNameString = firstName.toString();

      const type = parseInt(this.type, 10);

      const data = {
        "valid": validString,
        "lastname": lastNameString,
        "firstname": firstNameString,
        "type": type,
      };
      const headers = {
        'Authorization': `${this.$store.getters.getSession}`,
        //'k': `${this.$store.getters.getSession}`
      };

      axios
        .put(`${url}/user/`, data, {headers},{
        })
        .then((response) => {
          console.log('User data updated:', response.data);
          this.success = true;
          this.valid = '';
          this.lastname = '';
          this.firstname = '';
          this.type = '';
        })
        .catch((error) => {
          console.error('Failed to update user data:', error);
          this.success = false
        })
        .finally(() => {
          this.showDialog = true;
        })
    },
    showPasswordField() {
      this.showPasswordDialog = true;
    },
    async confirmPWDChange() {
          this.isPwdValid = computed(() => this.newPassword.length > 0);
          this.isValid = this.isPwdValid;
          console.log("isValid: ", this.isValid);
      
          if (this.isValid) {
            // Convert newPassword to string
            this.newPassword = String(this.newPassword);
            console.log(this.newPassword)
            try {
                const headers = {
                  'k': `${this.$store.getters.getSession}`,
                };
                const body = {
                  "password": `${this.newPassword}`,
                }
                console.log(this.newPassword)
          
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
        }, //confirmPWDChange()
        closeDialog() {
            this.showDialog = false;
        }, //closeDialog
  } //method
};
</script>

<style scoped>
.white-input input[type="text"] {
  color: black;
  font-weight: bold;
  height: 600px;
}

.UserCard {
  width: 700px;
  margin: 10px;
}

.password-input {
  display: true;
}
</style>
