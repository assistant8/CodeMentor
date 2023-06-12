import axios from "axios";

// * 베이스 URL 설정
// 근데 원래 setupProxy.js 설정으로 '/api'가 들어간 요청을 서버로 넘기려고 했었는데
// 그걸 실패하고 지금은 그냥 package.json에 proxy 설정을 해준 거니까..
// '/api'가 있든 없든 모든 요청이 백 서버로 가는 거 아닌가?
// 그럼 굳이 axios 설정으로 '/api'를 기본으로 붙여줄 필요가 있나..? 코치님도 '/'만 했었고.
// 아니 또 근데 그렇게 치면 '/'도 안 붙이고 그냥 써야 되는 거 아닌가?? 애매하네..
// -> 오피스 아워 떄 물어보고 수정하기.
axios.defaults.baseURL = "/api";

export const api = axios.create();
