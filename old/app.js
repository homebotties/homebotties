import { React, ReactDOM } from 'https://unpkg.com/es-react';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(React.createElement);

async function graphql(query) {
  let res = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  return await res.json()
}

function App() {
  const [lights, setLights] = React.useState([]);
  const [camera, setCamera] = React.useState('');
  React.useEffect(() => {
    graphql(`{ lights { name id }, camera}`).then(res => {
      setLights(res.data.lights);
      setCamera(res.data.camera);
    });
  }, []);
  return html`
    <div>
      <img src="${camera}" alt="image" width="600" />
      ${lights.map(light => html`
        <${Light} key=${light.id} name=${light.name} />
      `)}
    </div>
  `
}

function Light({ name }) {
  const handler = () => { graphql(`mutation { on(name:"${name}") }`)};
  const handleChange = (e) => { graphql(`mutation { set(name:"${name}", bri:${event.target.value}) }`)};
  return html`
    <div>
      <button onClick=${handler}>${name}</button>
      <input type="range" min="1" max="240" onChange=${handleChange} />
    </div>
  `
}

ReactDOM.render(html`<${App} />`, document.getElementById("root"));


