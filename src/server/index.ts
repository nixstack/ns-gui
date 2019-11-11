import Koa from 'koa'
import mongoose, { Schema } from 'mongoose'
import { ObjectId } from 'mongodb'

const port = process.env.PORT || 3000
const app = new Koa()

mongoose.set('useCreateIndex', true)

// 连接mongo服务
console.log('mongodb connecting...')
mongoose
  .connect(
    'mongodb://192.168.235.1:27017,192.168.235.1:27018,192.168.235.1:27019/nsguidb?replicaSet=rs',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(
    function(db) {
      console.log('mongodb connected...')
      // console.log(db);
    },
    function(reason) {
      console.log('mongodb connect reject...')
      console.log(reason)
    }
  )
  .catch(function(error) {
    console.log('mongodb failed...')
    console.log(error)
  })

const Comment = new Schema()
Comment.add({
  title: {
    type: String,
    index: true
  },
  date: Date,
  body: String,
  comments: [Comment]
})
const BlogPost = new Schema({
  title: {
    type: String,
    index: true
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  date: Date,
  buf: Buffer,
  comments: [Comment],
  creator: ObjectId
})
mongoose.model('BlogPost', BlogPost)

// a setter
// Comment.path('name').set(function (v) {
//   return capitalize(v);
// });

// middleware
// Comment.pre('save', function (next) {
//   notify(this.get('email'));
//   next();
// });

// retrieve my model
const BlogPostModel = mongoose.model('BlogPost')

// create a blog post

app.use(async (ctx, next) => {
  // create a comment
  // post.comments.push({ title: 'My comment' });

  // post.save(function (err) {
  //   if (!err) console.log('Success!');
  // });

  const post = new BlogPostModel()
  post.set('title', 'post title ' + Math.random())
  // post.save(function (err) {
  //   if (!err) {
  //     console.log('Update Success!');
  //     ctx.body = post.get('title');
  //   } else {
  //     ctx.body = 'Update failed!';
  //   }
  //   next();
  // });

  const result = await post.save()

  if (result._id) {
    ctx.body = result
  } else {
    ctx.body = '更新失败！'
  }
})

console.log(`server starting at port:::${port}`)
app.listen(port, function() {
  console.log(`server started at port:::${port}`)
})
