﻿document.addEventListener('DOMContentLoaded', function () {
     // Your JavaScript code here
     document
          .getElementById('loginForm')
          .addEventListener('submit', function (event) {
               event.preventDefault() // Prevent default form submission

               const username = document.getElementById('username').value
               const password = document.getElementById('password').value

               // Call the function to check authentication
               fetchAuthenticationLoginData(username, password)
          })

     function fetchAuthenticationLoginData(username, password) {
          const authUrl =
               'https://ap-southeast-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-btthb/auth/providers/custom-function/login'

          const requestData = {
               user: username,
               pass: password,
          }

          fetch(authUrl, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(requestData),
          })
               .then((response) => {
                    if (!response.ok) {
                         throw new Error('Network response was not ok')
                    }
                    return response.json()
               })
               .then((data) => {
                    console.log(
                         'Printing successful JSON Data: ' +
                              JSON.stringify(data)
                    )

                    const accessToken = JSON.parse(
                         JSON.stringify(data)
                    ).access_token
                    // Store the access token in localStorage
                    localStorage.setItem('accessToken', accessToken)

                    window.location.href = 'index.html'
               })
               .catch((error) => {
                    console.error(
                         'There was a problem with your fetch operation:',
                         error
                    )

                    alert(
                         'Username or password is incorrect. Please try again.'
                    )
               })
     }
})
