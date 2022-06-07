export const MappingRouteDisconnect: any = {
  sale: {
    path: "/put-on-sell/:id",
    to: "/",
    type: "push",
  },
  nftDetail: {
    path: "/marketplace/nft/:id",
    to: "/marketplace/nft/:id",
    type: "reload",
  },
  myNFTs: {
    path: "/my-nfts",
    to: "/",
    type: "push",
  }
};

const diff = (target: string, source: string) => target.split(source).join("");

export function navigateDisconnect(router: any) {
  const splits = router.pathname.split("[");
  const idName = splits.length > 1 ? splits[1].replace("]", "") : "";
  const id = router.query[idName];
  let routeMap: string = "";
  for (const route of Object.keys(MappingRouteDisconnect)) {
    const path = MappingRouteDisconnect[route].path.replace(
      ":id",
      id ? id : "",
    );
    if (router.asPath.search(path) > -1 && !diff(router.asPath, path) ) {
      routeMap = route;
      break;
    }
  }
  routeMap === ""
    ? router.reload()
    : MappingRouteDisconnect[routeMap].type === "push"
    ? router.push(
        MappingRouteDisconnect[routeMap].to.replace(":id", id ? id : ""),
      )
    : router.reload();
}
