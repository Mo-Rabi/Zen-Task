import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className="container">
      <footer className="d-flex justify-content-between align-items-center py-2 my-2 border-top ">
        <div className="col-md-4 d-flex align-items-center">
          <span className="ms-3"></span>

          <span className="mb-md-0">© 2023 ZenTask, Inc</span>
        </div>
        <ul className="nav col-md-4 me-3 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              Newsletter
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              Plans
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              About us
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              Careers
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
