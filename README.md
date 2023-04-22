# Proyecto Backend - Servidor CRUD

![Consignas](./proyectoBackEnd.jpg)

- Postman collection: "Proyecto Back-end.postman_collection.json"
- Script: "npm start"
- Port: 3000

## Routes:

-     "./user/":{
            "function": "See 'user' index."
        },

-     "./user/login": {
            "function": "Login with your account.",
            "body": {
                "email": "your@email.com",
                "password": "yourPassword",
                "remember": "boolean, true or false"
            }
        },

-     "./user/logout": {
            "function": "Log out from your account."
        },

-     "./user/register": {
            "function": "Login with your account.",
            "body": {
                "name": "Your name.",
                "email": "your@email.com",
                "password": "yourPassword"
            }
        },

-     "./user/info": {
          "./info": "See 'info' index.",
          "./info/change-name": {
              "function": "Change your account name.",
              "body": {
                  "name": "New name."
              }
          },
          "./info/change-email": {
              "function": "Change your account email.",
              "body": {
                  "email": "New email."
              }
          },
          "./info/change-password": {
              "function": "Change your account password.",
              "body": {
                  "password": "New password."
              }
          },
          "./info/unregister": {
            "function": "Delete your account."
          }
        }

### API:

-     "./super/search/": {
            "function": "Search a superhero.",
            "params": "./super/search/name with superhero's 'name'"
        },

-     "./super/search-id/": {
            "function": "Search a superhero.",
            "params": "./super/search-id/id with superhero's 'id'"
        },

-     "./super/search-id-power/": {
            "function": "Search a superhero's power.",
            "params": "./super/search-id-power/id with superhero's 'id'"
        },

-     "./super/search-id-bio/": {
            "function": "Search a superhero's biography.",
            "params": "./super/search-id-bio/id with superhero's 'id'"
        },

-     "./super/search-id-image/": {
            "function": "Search a superhero's image.",
            "params": "./super/search-id-image/id with superhero's 'id'"
        },

-     "./super/bookmarks/": {
            "function": "List your bookmarks.",
            "params": "./super/bookmarks"
        },

-     "./super/add-to-bookmarks/": {
            "function": "Adds a hero to your bookmarks.",
            "params": "./super/add-to-bookmarks/id with superhero's 'id'"
        },

-     "./super/delete-from-bookmarks/": {
            "function": "Removes a hero from your bookmarks.",
            "params": "./super/delete-from-bookmarks/id with superhero's 'id'"
        }
