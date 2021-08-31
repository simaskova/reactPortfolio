import { BASE_URL } from "./Blog";
import { Component, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import marked from "marked";
import styled from "styled-components";

const DivArticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 3em;
  overflow: hidden;
  border: 2px solid blue;
  border-radius: 4px;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  border: solid 2px ${theme.blog.primary};
  margin: 0.5em;
  width: 50vw;
  height: 50vh;

  h1 {
    font-size: larger;
  }
  h2 {
    font-size: large;
  }
  h3 {
    font-size: medium;
  }
`;
const DivTitle = styled.div`
  font-size: xx-large;
  line-height: 1em;
  padding: 0.2em;
  background: ${theme.blog.secondary};
`;
const DivDate = styled.div`
  color: ${theme.blog.secondaryTextColor};
  font-size: x-large;
`;

const DivWrapAuthor = styled.div`
  display: flex;
  align-items: flex-end;
  border: 2px white solid;
`;

const DivAuthor = styled.div`
  color: ${theme.blog.secondaryTextColor};
  font-size: x-large;
`;
const DivBody = styled.div`
  font-size: small;
  code {
    overflow-x: visible;
  }
`;

type Props = {
  blog: {
    author: string;
    title: string;
    text: string;
    date: string;
    articleURL: string;
  };
  fulltext: boolean;
};

export const Article = (props: Props) => {
  function createMarkup() {
    const articleBody = marked(
      props.fulltext ? props.blog.text : props.blog.text.slice(0, 200)
    );
    return {
      __html: articleBody,
    };
  }

  return (
    <div>
      <div>
        <DivArticle>
          {props.fulltext === false ? (
            <Link to={`${BASE_URL}${props.blog.articleURL}`}>
              <DivTitle>{props.blog.title}</DivTitle>
            </Link>
          ) : (
            <DivTitle>{props.blog.title}</DivTitle>
          )}
          <DivDate>{props.blog.date}</DivDate>
          <DivBody dangerouslySetInnerHTML={createMarkup()}></DivBody>
          <DivWrapAuthor>
            <DivAuthor>{props.blog.author}</DivAuthor>
          </DivWrapAuthor>
        </DivArticle>
      </div>
    </div>
  );
};
