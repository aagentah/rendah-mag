import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'

import category from './documents/category'
import post from './documents/post'
import author from './documents/author'
import user from './documents/user'

import siteSettings from './objects/siteSettings'


export default createSchema({
  name: 'default',
  types: schemaTypes.concat(
    [
      blockContent,
      //
      post,
      author,
      category,
      user,
      //
      siteSettings
    ]
  )
})
