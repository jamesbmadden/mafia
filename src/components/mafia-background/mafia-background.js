import { LitElement, html, css, customElement, property, query } from 'lit-element';

import VideoPoster from '../../assets/background_preview.jpg';

@customElement('mafia-background')
export default class MafiaApp extends LitElement {

  @property() video;
  @query('video') videoElement;
  @property({type: Boolean}) blur = false; 
  
  static get styles () {
    return css`
      .root {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      video {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
      }
      .blurred {
        filter: blur(4px);
      }
    `;
  }

  async connectedCallback () {
    super.connectedCallback();

    this.video = (await import('../../assets/background.mp4')).default;

    this.boundResizeVideo = this.resizeVideo.bind(this);

    this.resizeVideo();
    addEventListener('resize', this.boundResizeVideo);
  }

  disconnectedCallback () {
    super.disconnectedCallback();

    removeEventListener('resize', this.boundResizeVideo)
  }

  resizeVideo () {
    if (innerHeight < innerWidth / 1.777777777777778) {
      this.videoElement.style.width = '100%';
      this.videoElement.style.height = 'auto';
    } else {
      this.videoElement.style.width = 'auto';
      this.videoElement.style.height = '100%';
    }
  }

  advanceVideo () {
    this.videoElement.play();
    setTimeout(() => {
      this.videoElement.pause();
    }, 2000);
  }

  render () {
    return html`
      <div class="root">
        <video muted src="${this.video}" poster=${VideoPoster} oncanplay="this.muted=true" class=${this.blur ? 'blurred' : ''}></video>
      </div>`;
  }

}