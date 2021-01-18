import React from "react";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import { BlockMath, InlineMath } from "react-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import gfm from "remark-gfm";
import "katex/dist/katex.min.css";

const _mapProps = (props) => ({
    ...props,
    escapeHtml: false,
    plugins: [[gfm, { singleTilde: false }], RemarkMathPlugin],
    renderers: {
        ...props.renderers,
        code: ({ language, value }) => {
            if (value) {
                return (
                    <SyntaxHighlighter
                        style={dark}
                        language={language}
                        children={value}
                    />
                );
            } else {
                return (
                    <>
                        <>{"~~~" + language}</>
                        <br></br>
                        <>~~~</>
                    </>
                );
            }
        },
        math: ({ value }) => <BlockMath>{value}</BlockMath>,
        inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>,
    },
});

const Markdown = (props) => <ReactMarkdown {..._mapProps(props)} />;

export default Markdown;
