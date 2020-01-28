import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import Beacons from "views/Beacons.jsx";
import PinsList from "views/PinsList.jsx";

const dashboardRoutes = [
	{
		path: "/dashboard",
		name: "Dashboard",
		icon: "pe-7s-graph",
		component: Dashboard,
		layout: "/admin"
	},
	{
		path: "/user",
		name: "User Profile",
		icon: "pe-7s-user",
		component: UserProfile,
		layout: "/admin"
	},
	{
		path: "/table",
		name: "Table List",
		icon: "pe-7s-note2",
		component: TableList,
		layout: "/admin"
	},
	{
		path: "/typography",
		name: "Typography",
		icon: "pe-7s-news-paper",
		component: Typography,
		layout: "/admin"
	},
	{
		path: "/icons",
		name: "Icons",
		icon: "pe-7s-science",
		component: Icons,
		layout: "/admin"
	},
	{
		path: "/pinslist",
		name: "Pins List",
		icon: "pe-7s-map-marker",
		component: PinsList,
		layout: "/admin"
	},
	{
		path: "/notifications",
		name: "Notifications",
		icon: "pe-7s-bell",
		component: Notifications,
		layout: "/admin"
	},
	{
		path: "/beacons",
		name: "Beacons",
		icon: "pe-7s-global",
		component: Beacons,
		layout: "/admin"
	},
	{
		upgrade: true,
		path: "/upgrade",
		name: "Upgrade to PRO",
		icon: "pe-7s-rocket",
		component: Upgrade,
		layout: "/admin"
	}
];

export default dashboardRoutes;
