import Component from '../Component.mjs'
import Header from './components/Header.mjs'
import PostList from './components/PostList.mjs'
import FavPostList from './components/FavPostList.mjs'
import FollowingPostList from './components/FollowingPostList.mjs'
import Footer from './components/Footer.mjs'

const home = new Component(document.body)
const header = new Header
home.add(header)

header.onHomeClick(() => {

    if (favPostList && body.has(favPostList)) {

        body.remove(favPostList)
        body.add(postList)

        postList.clearPosts()
        postList.listPosts()

    } else if (followingPostList && body.has(followingPostList)) {

        body.remove(followingPostList)
        body.add(postList)

        postList.clearPosts()
        postList.listPosts()

    }
})

let favPostList
let followingPostList

header.onFavsClick(() => {

    if (body.has(postList)) {
        body.remove(postList)

        favPostList = new FavPostList
        body.add(favPostList)

    } else if (followingPostList && body.has(followingPostList)) {

        body.remove(followingPostList)

    }

    if (!favPostList) {

        favPostList = new FavPostList
    }
    body.add(favPostList)

    favPostList.clearPosts()
    favPostList.listPosts()
})

header.onFollowClick(() => {

    if (body.has(postList)) {

        body.remove(postList)

        followingPostList = new FollowingPostList()
        body.add(followingPostList)

        followingPostList.listPosts()

    } else if (favPostList && body.has(favPostList)) {

        body.remove(favPostList)
    }

    if (!followingPostList) {

        favPostList = new FollowingPostList()
    }
    body.add(followingPostList)

    followingPostList.clearPosts()
    followingPostList.listPosts()
})

const body = new Component(document.createElement('main'))
body.setClassName('view main')
home.add(body)

const postList = new PostList
body.add(postList)

postList.listPosts()

const footer = new Footer
home.add(footer)

footer.onPostCreated(() => {
    postList.clearPosts()
    postList.listPosts()
})

