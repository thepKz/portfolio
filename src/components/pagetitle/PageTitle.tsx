import React from "react";

interface PageTitleProps {
  pageTitle: string;
  pagesub: string;
  pclass?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ pageTitle, pagesub }) => {
  return (
    <div className="breadcumb-area box-style">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcumb-wrap">
              <h2>{pageTitle}</h2>
              <h3>{pagesub}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;