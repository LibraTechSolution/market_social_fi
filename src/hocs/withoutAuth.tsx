import React, { Component } from "react";
import Router from "next/router";
import { NextPage } from "next";
import { getFromLocalStorage } from "utils/functions";

export default function withoutAuth(AuthComponent: NextPage) {
  return class Authenticated extends Component {
    constructor(props: any) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    componentDidMount() {
      if (getFromLocalStorage("personal-info")) {
        Router.push("/nft");
        this.setState({ isLoading: false });
      }
    }

    render() {
      return <AuthComponent {...this.props} />;
    }
  };
}
