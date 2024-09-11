import Snabbdom from 'snabbdom-pragma'
import { nativeAssetId } from '../const'
import { updateQuery } from '../util'

const staticRoot = process.env.STATIC_ROOT || ''
const hasCam = process.browser && navigator.mediaDevices && navigator.mediaDevices.getUserMedia
const otherTheme = { dark: 'light', light: 'dark' }

export default (t, theme, page) =>

<div className="toggle-container">
  <div className="burger-icon">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <div className="toggle-menu">
    <div className="toggle-menu-header">
      { process.browser ? <div className="switch-theme-icon toggle-theme"></div>
        : <a href={page.pathname.substr(1) + updateQuery(page.query, { theme: otherTheme[theme] })} className="switch-theme-icon"></a>
      }
    </div>
    <div className="section1">
      <h4 className="menu-title">Exchanges</h4>
      <div className="wallets-link">
        <p>Redot</p>
        <div>
          <a href="https://play.google.com/store/apps/details?id=com.redot.app" target="_blank"><img src={`${staticRoot}img/icons/google-play.png`} alt="google play"/><span>Google Play</span></a>
          <a href="https://redot.com/" target="_blank"><img src={`${staticRoot}img/icons/web.png`} alt="web"/><span>Web</span></a>
        </div>
      </div>
    </div>
    <div className="section2">
      <div className="link-list">
        <h4 className="menu-title">Explorers</h4>
        <ul>
          <li><a href="/" rel="external">Bitcoin</a></li>
          <li><a href="https://ethscan.org/" rel="external">Ethereum</a></li>
          <li><a href="https://xmrscan.org/" rel="external">Monero</a></li>
        </ul>
        <h4 className="menu-title">Developer Tools</h4>
        <ul>
          <li><a href="https://github.com/nobd/btcscan-org/blob/master/API.md" target="_blank">API</a></li>
          <li><a href="tx/push">Broadcast Transactions</a></li>
          <li> { hasCam ? <a href="scan-qr">Scan QR</a> : ""}</li>
          <li> { process.env.IS_ELEMENTS ? <a href={`asset/${nativeAssetId}`}>Pegs</a> : ""}</li>
        </ul>
      </div>
      <div className="link-list">
        <h4 className="menu-title">Other Products</h4>
        <ul>
          <li><a href="https://redot.com/" target="_blank">Redot Exchange</a></li>
          <li><a href="https://redot.com/staking/" target="_blank">Redot Staking</a></li>
          <li><a href="https://redot.com/custody/" target="_blank">Redot Custody</a></li>
          <li><a href="https://redot.com/derivatives/" target="_blank">Redot Derivatives</a></li>
          <li><a href="https://redot.com/trade/signup" target="_blank">Buy Crypto</a></li>
          <li><a href="https://ethscan.org/" target="_blank">Ethereum</a></li>
          <li><a href="https://btcmempool.org/" target="_blank">BTC Mempool</a></li>
        </ul>
      </div>
      <div className="link-list">
        <h4 className="menu-title">Useful Links</h4>
        <ul>
          <li><a href="https://redot.com/help/" target="_blank">Help Center</a></li>
          <li><a href="https://redot.com/help/en-us/10-contact-us/10-how-can-i-submit-a-support-request" target="_blank">Submit a bug / request</a></li>
          <li><a href="https://redot.com/about-us/" target="_blank">About Redot</a></li>
          <li><a href="https://redot.com/blog/" target="_blank">Insights</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
