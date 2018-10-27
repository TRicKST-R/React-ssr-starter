import React from 'react'
import gt from 'graphql-tag'
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

export default graphql(gt`
	{
	posts {
			id
			title
			body
		}
	}
`)(Home)
