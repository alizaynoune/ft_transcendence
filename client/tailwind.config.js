/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const fs = require('fs')
const path = require('path')
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents(require('./configs/input.config'))
      addComponents(
        // add icons to class
        function () {
          const icons = [
            '42', 'ACHIEVEMENTS', 'AddFriend', 'Attachment',
            'Attention', 'BellFill', 'Block', 'BlockUser',
            'Calendar', 'CalenderEdit', 'CameraEdite', 'Close',
            'DeleteUser', 'DotsH', 'DotsV', 'Down',
            'Equalizer', 'Friends', 'Game', 'Github',
            'Info', 'Left2Arrow', 'LeftArrow', 'Linkedin',
            'Location', 'Messager1', 'Network', 'NewGame',
            'Off', 'Phone', 'Plus', 'Quote',
            'Right2Arrow', 'RightArrow', 'Send', 'Setting',
            'Settings2', 'Star', 'StarFill', 'StarHalf',
            'Trash', 'Up', 'Upload', 'Write',
            'accept', 'addGroup', 'dashboard', 'email',
            'emoji', 'eyeActive', 'eyeDisactive', 'facebook',
            'google', 'message', 'notif', 'out',
            'password', 'search', 'user', 'userInfo'
          ]
          return icons.map(i => {
            return(
              {
              [`.icon-${i}`]: {
                '&:before': {
                  maskImage: `url('/assets/icons/${i}.svg')`,
                }
              }
            }
            )
          })
        }
      )



    })
  ],
}
