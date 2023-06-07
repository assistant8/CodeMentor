import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://backend-server-url", // 백엔드 서버의 URL로 변경.
      changeOrigin: true,
    })
  );
}

// 이제 프론트에서 /api로 시작하는 요청을 생성하면 그 요청은 프록시를 통해 백엔드 서버로 직행함.
// - fetch로 /api/path... 해도 되는데, 그러면 클라이언트가 서버와 직접 통신하게 됨.
// - 클라이언트에서 서버에 직접 접근하게 되면 보안상 이슈가 발생할 수 있음.
// - 그래서 프록시에게 중개를 맡김. 프록시를 이용하면 클라이언트와 서버가 각자 서로에게 간접적으로 접근하게 됨.
// - 프록시는 그러니까.. 유통 업자라고 볼 수 있음. 챙기는 수익 없이 무료 봉사한다는 점만 제외하면.
// 예를 들어, /api/users로 요청을 보내면 이 요청은 백엔드 서버로 전달됨.
// 근데 개발 환경에서만 동작한다고 함. 빌드 환경에서는 프록시 설정이 무시된다는 것.
// - 이게 무슨 말인지 모르겠음. 프론트와 서버와의 직접 통신에서 보안 이슈가 발생할 수 있어서 프록시를 두는 건데(그것 때문만은 아니지만 일단) 배포하면 그로 인한 보안 이슈가 사라지는 건가? 왜 배포 환경에서는 프록시 설정이 무시되는 건지 모르겠음.
