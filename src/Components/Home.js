import React, { Component } from 'react'
import {Query} from 'apollo-client'
import ggl from 'graphql-tag'
import { graphql } from 'react-apollo'

const Home = ({data}) => {
	if(data.loading) return 'Loading ...'
	const {posts} = data
	return(
		<div>
			{posts.map((post, index) => <h1 key={index}>{post.title}</h1>)}
		</div>
	)
}

export default graphql(ggl`
{
 posts {
		id
		title
		body
	}
}
`)(Home);



// const test = ggl`
//   {
//     posts {
//       id
//       title
//       body
//     }
//   }
// `
// export default () => (
// 	<Query query={test} ssr={false}>
// 		{({data}) => {
// 			const {posts} = data
// 			{posts.map((post) => <h1>{post.title}</h1>)}
// 		}}
// 	</Query>
// )

// class Home extends Component {
// 	constructor(props) {
//     super(props)
//     this.state = {}
// 	}

//   render(){

// 		const {loading, posts} = this.props

// 		if (loading) {
//       return <div>Loading...</div>
//     }

// 		return(
// 			<div>
// 				<h1>It's HOME</h1>
// 				{posts.map((post) => <h1>{post.title}</h1>)}
// 			</div>
// 		)
// 	}
// }

// export default (
// 	<Query query={test} ssr={false}>
// 		{({loading, data}) => (
// 			<Home posts={data.posts} loading={loading} />
// 		)}
// 	</Query>
// )