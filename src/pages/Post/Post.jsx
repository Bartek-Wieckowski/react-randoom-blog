import "./post.scss";
import noSetImg from "../../assets/noSetImg.png";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { usePosts } from "../../contexts/PostsContext";
import { formatDate } from "../../utils/helpers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Hero from "../../components/Hero/Hero";
import MainWrapper from "../../components/MainWrapper/MainWrapper";
import Spinner from "../../components/Spinner/Spinner";
import PostsList from "../../components/PostsList/PostsList";
import CommentForm from "../../components/CommentForm/CommentForm";

export default function Post() {
  const { slug } = useParams();
  const { isLoading, fetchSinglePost, currentPost } = usePosts();
  const { postID, postRestDetails } = currentPost;

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, file } = node.data.target.fields;
        const imageUrl = file.url;
        return <img src={imageUrl} alt={title} />;
      },
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSinglePost(slug);
  }, [fetchSinglePost, slug]);

  if (isLoading) return <Spinner type="full-page-spinner" />;
  return (
    <div className="single-post" id={postID}>
      <Hero type="hero__normal">
        <div className="single-post__intro">
          <div className="single-post__heading">
            <h1>{postRestDetails?.title}</h1>
            <div className="meta">
              <span className="date">{formatDate(postRestDetails?.date)}</span>
              <span className="category">
                <Link to={`/kategoria/${postRestDetails?.categorySlug}`}>{postRestDetails?.category}</Link>
              </span>
              <span className="comment">
                <Link to="">3 comments</Link>
              </span>
            </div>
            <div className="author">
              <img
                src={
                  postRestDetails?.authorPicture?.fields.file.url
                    ? postRestDetails?.authorPicture?.fields.file.url
                    : noSetImg
                }
                alt={postRestDetails?.author}
              />
              <h4>
                <Link to="">{postRestDetails?.author}</Link>
              </h4>
            </div>
          </div>
        </div>
      </Hero>
      <MainWrapper>
        <PostsList>
          <article className="single-post__article">
            <figure>
              <img
                src={postRestDetails?.mainImg.fields.file.url}
                alt=""
                className="single-post__article--mainImg"
              />
            </figure>
            {documentToReactComponents(currentPost.postRestDetails?.content, options)}
            <footer>
              <span className="separator">#tags</span>
              <div className="tags">
                {postRestDetails?.tags.map((tag) => (
                  <Link className="btn-tag" key={tag}>
                    {tag}
                  </Link>
                ))}
              </div>
            </footer>
          </article>
          <CommentForm />
        </PostsList>
      </MainWrapper>
    </div>
  );
}
