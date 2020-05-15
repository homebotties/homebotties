// learn more about HTTP functions here: https://arc.codes/primitives/http
//
// TODO:
// - serve the readme somehow?
// - serve examples/car/app.html
// - serve api.js
// 
export async function handler (event: object) {
    return {
      statusCode: 200,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Homebotties</title>
    <link rel=stylesheet href=//cdn.jsdelivr.net/npm/graphql-playground-react/build/static/css/index.css>
    <link rel="shortcut icon" href=//cdn.jsdelivr.net/npm/graphql-playground-react/build/favicon.png>
    <script src=//cdn.jsdelivr.net/npm/graphql-playground-react/build/static/js/middleware.js></script>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .margin-left-8 {
        margin-left: 0.5rem;
      }
      .margin-bottom-16 {
        margin-bottom: 1rem;
      }
      .margin-bottom-8 {
        margin-bottom: 0.5rem;
      }
      .padding-32 {
        padding: 2rem;
      }
      .color-grey {
        color: #333;
      }
      .color-black-link:hover {
        color: black;
      }
      xbody {
        background-color: rgb(23, 42, 58);
        font-family: Open Sans, sans-serif;
        height: 90vh;
      }
  
      #root {
        xheight: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      .loading {
        font-size: 32px;
        font-weight: 200;
        color: rgba(255, 255, 255, .6);
        margin-left: 20px;
      }
  
      img {
        width: 78px;
        height: 78px;
      }
  
      .title {
        font-weight: 400;
      }
    </style>
  </head>
  <body class="padding-32">
      <div class="margin-left-8">
        <div class="margin-bottom-16">
          <h1 class="margin-bottom-16">
            Homebotties
          </h1>
          <p class="margin-bottom-8">
          </p>
          <code>
            src/http/get-index/index.ts
          </code>
        </div>
        <div>
          <p class="margin-bottom-8">
            View documentation at:
          </p>
          <code>
            <a class="color-grey color-black-link" href="https://homebotties.com">https://homebotties.com</a>
          </code>
        </div>
        <div id=root>
            <img src=//cdn.jsdelivr.net/npm/graphql-playground-react/build/logo.png>
            <div class=loading> Loading
                <span class=title>GraphQL Playground</span>
            </div>
        </div>
    </div>
    <script>
    window.addEventListener('load', function main(event) {
        GraphQLPlayground.init(document.getElementById('root'), {
            endpoint: '/api',
            settings: {
            'request.credentials': 'include'
            }
        })
    })
    </script>
    </body>
  </html>
  `
    };
  }