import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Alert,
  Input,
  Drawer,
  Card,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  BoltIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import {
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/gymnation-logo.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // eslint-disable-next-line no-unused-vars
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton
        variant="text"
        size="lg"
        onClick={openDrawer}
        onMouseOver={openDrawer}
      >
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>

      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        onMouseLeave={closeDrawer}
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src={logo}
              alt="GymNation Logo"
              className="h-14 w-14 scale-125 hover:cursor-pointer"
              onClick={() => navigate("/")}
            />
            <Typography variant="h3" className=" text-indigo-600">
              GymNation
            </Typography>
          </div>
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
            <ListItem
              className="border-b-0 p-3"
              selected={open === 1}
              onClick={() => {
                closeDrawer();
                navigate("/dashboard");
              }}
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </ListItem>

            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <BoltIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Workouts
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem
                    onClick={() => {
                      closeDrawer();
                      navigate("/dashboard/workouts");
                    }}
                  >
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    View Your Workouts
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      closeDrawer();
                      navigate("/dashboard/workouts/create-workout");
                    }}
                  >
                    <ListItemPrefix>
                      <PlusIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Create a Workout
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <GlobeAltIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    View the Worlds Workouts
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <ListItem
              onClick={() => {
                closeDrawer();
                navigate("/dashboard/exercises");
              }}
            >
              <ListItemPrefix>
                <FontAwesomeIcon icon={faDumbbell} className="h-5 w-5" />
              </ListItemPrefix>
              Exercises
            </ListItem>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Logout
            </ListItem>
          </List>
          <Alert
            open={openAlert}
            className="mt-auto bg-indigo-600"
            onClose={() => setOpenAlert(false)}
          >
            <CubeTransparentIcon className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1">
              Welcome to GymNation!
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              GymNation unites fitness enthusiasts through dynamic workouts and
              social connectivity.
            </Typography>
          </Alert>
        </Card>
      </Drawer>
    </>
  );
};

export default Sidebar;
