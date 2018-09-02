import React from 'react'
import { Link } from 'react-router'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import fetchSongList from '../queries/fetchSongList'

class SongList extends React.Component {
    render() {
        const { loading, songs } = this.props.data
        if (loading) {
            return (
                <div>Loading...</div>
            )
        } else if (!loading && songs.length === 0) {
            return (
                <div>
                    <h4>Click to add a song</h4>
                    <Link to="/songs/new" className="btn-floating btn-large red right">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            )
        }
        return (
            <div>
                <ul className="collection">
                    {this._renderSongs()}
                </ul>
                <Link to="/songs/new" className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
    _onSongDelete(id) {
        this.props.mutate({
            variables: { id },
        }).then(() => this.props.data.refetch())
    }
    _renderSongs() {
        const { songs } = this.props.data
        return songs.map(({ id, title }) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`/songs/${id}`}>{title}</Link>
                    <i className="material-icons" onClick={() => this._onSongDelete(id)}>delete</i>
                </li>
            )
        })
    }
}

const mutation = gql`
mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
        id
    }
}
`

export default compose(
    graphql(fetchSongList),
    graphql(mutation))(SongList)
