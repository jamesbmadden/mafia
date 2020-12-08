import { LitElement, html, css, customElement, property, query } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

@customElement('mafia-generator')
export default class MafiaGenerator extends LitElement {

  @query('.split-box') splitBox;

  @property({type: Array}) players = [{name: "James", id: 0}];
  @property({type: Array}) roles = [{name: "Mafia", count: 1, id: 0}, {name: "Villager", count: 4, id: 1}, {name: "Detective", count: 1, id: 2}];
  @property({type: Number}) reload = 0;

  uniquePlayerIndex = 1;
  uniqueRolesIndex = 3;
  
  static get styles () {
    return css`
      :host {
        position: absolute;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .split-box {
        position: relative;
        display: block;
        width: 100%;
        display: flex;
        flex-direction: row;
        max-width: 576px;
        width: 100%;
      }
      .split-box > * {
        box-sizing: border-box;
        width: 100%;
        max-width: 288px;
        padding: 1rem;
        max-height: calc(100vh - 256px);
        overflow-y: auto;
      }

      h3 {
        font-weight: 400;
      }

      @keyframes listRowEnter {
        from {
          opacity: 0;
          transform: translate(-2rem);
          margin-bottom: -48px;
        }
      }
      @keyframes listRowExit {
        to {
          opacity: 0;
          transform: translate(-2rem);
          margin-bottom: -48px;
        }
      }

      .list-row {
        display: flex;
        flex-direction: row;
        padding-bottom: 1rem;
        opacity: 1;
        transform: translate(0);
        margin-bottom: 0px;
        animation: listRowEnter 0.4s;
        width: 100%;
        max-width: 288px;
      }
      .list-row .text-input {
        flex-grow: 1;
        flex-shrink: 1;
        padding: 8px;
        width: calc(100% - 40px);
        max-width: 248px;
        background: rgba(255, 255, 255, 0.5);
        border: 0;
        border-radius: 8px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
      }
      .role-row .text-input {
        width: calc(100% - 106px);
      }
      .list-row .text-input:hover {
        background: rgba(255, 255, 255, 0.66);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        transform: translateY(-1px);
      }
      .list-row .number-input {
        flex-grow: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        width: 48px;
        height: 32px;
        margin-left: 8px;
        padding: 8px;
        background: rgba(255, 255, 255, 0.5);
        border: 0;
        border-radius: 8px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
      }

      .list-button {
        box-sizing: border-box;
        flex-grow: 0;
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        margin-left: 8px;
        background: rgba(255, 255, 255, 0.25);
        border: 0;
        border-radius: 50%;
        font-size: 1.05rem;
        cursor: pointer;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
      }
      .list-button:hover {
        background: rgba(255, 255, 255, 0.33);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        transform: translateY(-1px);
      }
    `;
  }

  render () {
    return html`
      <h1><i>Mafia</i> Generator</h1>
      <div class="split-box">
        <div class="players">
          <h3>Players</h3>
          ${repeat(this.players, player => player.id, (player, index) => {
            return html`
              <div class="list-row name-row">
                <input class="text-input name-input" type="text" placeholder="Name" value=${player.name}>
                <button class="list-button" @click=${() => {
                  this.players.splice(index, 1);
                  this.splitBox.querySelectorAll('.name-row')[index].style.animation = 'listRowExit 0.4s forwards';
                  setTimeout(() => {
                    this.reload++;
                  }, 400);
                }}>-</button>
              </div>
            `;
          })}
          <button class="list-button" @click=${() => {
            this.players.push({name: '', id: this.uniquePlayerIndex});
            this.uniquePlayerIndex++;
            this.reload++;
          }}>+</button>
        </div>
        <div class="roles">
          <h3>Roles</h3>
          ${repeat(this.roles, role => role.id, (role, index) => {
            return html`
              <div class="list-row role-row">
                <input class="text-input role-input role-input-name" type="text" placeholder="Role" value=${role.name}>
                <input class="number-input role-input role-input-count" type="number" value=${role.count}>
                <button class="list-button" @click=${() => {
                  this.roles.splice(index, 1);
                  this.reload++;
                }}>-</button>
              </div>
            `;
          })}
          <button class="list-button" @click=${() => {
            this.roles.push({name: '', count: 1, id: this.uniqueRolesIndex});
            this.uniqueRolesIndex++;
            this.reload++;
          }}>+</button>
        </div>
      </div>
      <button>Generate!</button>`;
  }

}