import { Provider } from 'react-redux';
import { store } from '../app/store';
import '../styles/globals.css';
import '../styles/custom.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom } from 'react-toastify';
import { SessionProvider } from "next-auth/react"
import StorageService from '../services/StorageService';
import { hydrate } from '../slices/basketSlice';
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());


const MyApp = ({ Component, pageProps }:any) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer transition={Zoom} limit={4}/>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
