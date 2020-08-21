const state = {
  theme: {
    colorNav: '#252a2f',
    colorHead: '',
    colorBg: '',
    bg: [],
    cursorImg: '',
  },
};

const getters = {};

const mutations = {
  setTheme(state, theme) {
    state.theme = theme

    let css = document.createElement('style');
    css.type = 'text/css';

    // 表格背景色
    let innerHTML = '.table,.edit-ct{background-color: ' + theme.colorBg + ';}'
    if(theme.colorBg !== 'rgba(255, 255, 255, 1)'){
      innerHTML += '.el-table,.el-table__expanded-cell,.el-table th,.el-table tr{background-color: transparent}'
    }

    css.innerHTML = innerHTML
    console.log(css)
    document.getElementsByTagName('head')[0].appendChild(css);
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
