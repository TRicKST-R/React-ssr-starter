import React, { Component } from 'react'
import App from './Components/App'
import Home from './Components/Home'

const NotFoundPage = () => (
	<h1>Sorry, the requested page could not be found.</h1>
)

const routes = [
	{
		component: App,
		routes: [
			{
				path: '/',
				name: 'home',
				exact: true,
				component: Home,
			},
			{
				path: '*',
				name: 'notfound',
				component: NotFoundPage,
			}
		]
	}
]
  
export default routes;