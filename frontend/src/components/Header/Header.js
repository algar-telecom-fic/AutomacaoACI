import React from "react";
import AlgarLogo from "../../assets/algar-logo.png";

import { useHistory, useLocation } from "react-router-dom";
import { Menubar } from "primereact/menubar";

import "./styles.css";

const Header = (props) => {
  const history = useHistory();
  const location = useLocation();

  const items = [
    {
      label: "",
      icon: "pi pi-fw pi-arrow-left",
      command: () => {
        console.log(history);
        history.goBack();
      },
    },
    {
      label: "Home",
      command: () => {
        history.push("/");
      },
    },
    {
      label: "Logical Objects",
      items: [
        {
          label: "Tenant",
          command: () => {
            history.push("/tenant");
          },
        },
        {
          label: "VRF",
          command: () => {
            history.push("/vrf");
          },
        },
        {
          label: "EPG",
          command: () => {
            history.push("/epg");
          },
        },
        {
          label: "BD",
          command: () => {
            history.push("/bd");
          },
        },
        {
          label: "BD Subnet",
          command: () => {
            history.push("/bdsubnet");
          },
        },
        {
          label: "AP",
          command: () => {
            history.push("/ap");
          },
        },
      ],
    },
    {
      label: "Physical Objects",
      items: [
        {
          label: "Domain",
          command: () => {
            history.push("/domain");
          },
        },
        {
          label: "VlanPool",
          command: () => {
            history.push("/vlanpool");
          },
        },
        {
          label: "AAEP",
          command: () => {
            history.push("/aaep");
          },
        },
        {
          label: "Switch Profile",
          command: () => {
            history.push("/swprofile");
          },
        },
        {
          label: "Leaf Profile",
          command: () => {
            history.push("/leafprof");
          },
        },
      ],
    },
    {
      label: "Combos",
      command: () => {
        history.push("/combo");
      },
    },
    {
      label: "Querys",
      command: () => {
        history.push("/update/querys");
      },
    },
    {
      label: "About",
      command: () => {
        history.push("/about");
      },
    },
  ];

  const items01 = [
    {
      label: "About",
      command: () => {
        history.push("/about");
      },
    },
  ];

  const endMenuBar = (
    <img style={{ minWidth: "90px", minHeight: "25px" }} alt="Algar Logo" src={AlgarLogo} height="40"></img>
  );

  function checkRoute() {
    if (location.pathname === "/") {
      return items01;
    } else {
      return items;
    }
  }

  return (
    <>
      <Menubar model={checkRoute()} end={endMenuBar} />
      <div className="row mt-2 text-center mx-auto">
        <div className="mt-3 h3">{props.title}</div>
      </div>
    </>
  );
};

export default Header;
