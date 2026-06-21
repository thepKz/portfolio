import React from "react";

interface FontAwesomeProps {
  name: string;
  classname?: string;
}

const FontAwesome: React.FC<FontAwesomeProps> = ({ name, classname = "" }) => {
  return <i className={`fa fa-${name} ${classname}`} />;
};

export default FontAwesome;