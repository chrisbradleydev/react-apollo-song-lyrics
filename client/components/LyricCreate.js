import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LyricCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = { content: '' }
        this._onChange = this._onChange.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
    }
    render() {
        return (
            <form onSubmit={this._onSubmit}>
                <label>Add a lyric</label>
                <input type="text" value={this.state.content} onChange={this._onChange} />
                <input type="submit" value="Submit" className="waves-effect waves-light btn" />
            </form>
        )
    }
    _onChange(e) {
        this.setState({ content: e.target.value })
    }
    _onSubmit(e) {
        e.preventDefault()
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId,
            },
        }).then(() => {
            this.setState({ content: '' })
        }).catch((e) => {
            console.log(e)
        })
    }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`

export default graphql(mutation)(LyricCreate)
