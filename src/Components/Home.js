import React, { Component } from 'react'
import {Query} from 'apollo-client'
import ggl from 'graphql-tag'

const test = ggl`
  {
    posts {
      id
      title
      body
    }
  }
`

class Home extends Component {
  render(){
		return(
			<div>
				<h1>It's HOME</h1>
				{/* <Query query={test}>
					{({loading, data}) => {
						if(loading) return 'Loading...'
						const { posts } = data
						return posts.map((post) => <h1>{post.title}</h1>)
					}}
				</Query> */}
			</div>
		)
	}
}

export default Home