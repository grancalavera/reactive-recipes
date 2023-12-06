import { ReactNode } from "react";

export const Layout = ({
  sidebar,
  content,
}: {
  sidebar?: ReactNode;
  content?: ReactNode;
}) => (
  <div className="layout">
    <div className="sidebar">{sidebar}</div>
    <div className="content">{content}</div>
  </div>
);
