import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import {
  QueryDevtools,
  ReactQueryDevtools,
} from '@tanstack/react-query-devtools';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  //<React.StrictMode> comenting for react beautiful dnd to work WHY? Saw mentioned in another issue that it might be related to Strict Mode, so it probably originates from the fact that React now runs useEffect twice when within Strict Mode (in dev only, but works fine in prod).
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId="522419037603-pvts6dntv7tst7nq1cragf6m43n6ffiq.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
