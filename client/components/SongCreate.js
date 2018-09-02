import React from 'react'
import { Link, hashHistory } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import fetchSongList from '../queries/fetchSongList'

class SongCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: '' }
        this._onChange = this._onChange.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
    }
    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h4>Add a new song</h4>
                <form onSubmit={this._onSubmit}>
                    <label>Song Title:</label>
                    <input type="text" value={this.state.title} onChange={this._onChange} />
                    <input type="submit" value="Submit" className="waves-effect waves-light btn" />
                </form>
            </div>
        )
    }
    _onChange(e) {
        this.setState({ title: e.target.value })
    }
    _onSubmit(e) {
        e.preventDefault()
        this.props.mutate({
            variables: { title: this.state.title },
            refetchQueries: [{ query: fetchSongList }],
        }).then(() => hashHistory.push('/'))
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`

export default graphql(mutation)(SongCreate)
