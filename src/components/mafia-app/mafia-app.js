import { LitElement, html, css, customElement, property, query } from 'lit-element';

import MafiaBackground from '../mafia-background/mafia-background';
import MafiaGenerator from '../pages/mafia-generator/mafia-generator';

@customElement('mafia-app')
export default class MafiaApp extends LitElement {

  @query('mafia-background') background;
  @query('mafia-generator') generator;

  @property({type: Boolean}) buttonDisabled = false;

  @property() generatedRoles = [];
  @property({ type: Number }) reload = 0;

  boundOnGenerate;
  
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

      .dialogue {
        display: none;
      }
      .dialogue.visible {
        display: block;
      }

      .dialogue-front {
        z-index: 1;
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(100% - 2rem);
        max-width: 256px;
        height: calc(100% - 2rem);
        max-height: 386px;
        background: white;
        border-radius: 1rem;
        padding: 1rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        transform: translate(-50%, -50%);
      }
    `;
  }

  onGenerate (event) {
    const roles = event.detail;
    console.log(roles);
    this.generatedRoles = roles;
    this.reload++;
    this.background.blur = true;
    this.generator.style.filter = 'blur(4px)';
  }

  connectedCallback () {
    super.connectedCallback();

    this.boundOnGenerate = this.onGenerate.bind(this);

    requestAnimationFrame(() => {
      this.generator.addEventListener('generated', this.boundOnGenerate);
    });
  }

  disconnectedCallback () {
    this.generator.removeEventListeners('generated', this.boundOnGenerate);
  }

  render () {
    return html`
    <mafia-background></mafia-background>
    <div class="root">
      <mafia-generator></mafia-generator>
    </div>
    <div class="dialogue ${this.reload !== 0 ? 'visible' : ''}">
      <div class="dialogue-front">
        ${this.generatedRoles.map(role => {
          return html`<p>${role[0]}: ${role[1]}</p>`;
        })}
      </div>
    </div>
    `;
  }

}