import { LitElement, html, css, customElement, property, query } from 'lit-element';

import MafiaBackground from '../mafia-background/mafia-background';

@customElement('mafia-app')
export default class MafiaApp extends LitElement {

  @query('mafia-background') background;

  @property({type: Boolean}) buttonDisabled = false;
  
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
    <mafia-background></mafia-background>
    <div class="root">
      <h1><i>Mafia</i> Coming Soon</h1>
      <button ?disabled=${this.buttonDisabled} @click=${() => {
        this.background.advanceVideo();
        this.buttonDisabled = true;
        setTimeout(() => {
          this.buttonDisabled = false;
        }, 2000);
      }}>Advance Time</button>
    </div>`;
  }

}