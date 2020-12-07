import { LitElement, html, css, customElement, property, query } from 'lit-element';

@customElement('mafia-generator')
export default class MafiaGenerator extends LitElement {
  
  static get styles () {
    return css`
      .root {
        Position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    `;
  }

  render () {
    return html`
      <h1><i>Mafia</i> Generator</h1>
      <div class="split-box">
        <div class="players">

        </div>
        <div class="roles">

        </div>
      </div>
      <button>Generate!</button>`;
  }

}