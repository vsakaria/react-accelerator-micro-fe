import React from "react";

//@ts-ignore 
import { BrandProvider, LLOYDS, BOS } from '@lbg/constellation';

let brandCSS = 'lloyds';
loadCss();

export const BrandProviderLoader = (props: any) => {
    return (
        <BrandProvider brand={brandCSS}>
            {props.children}
        </BrandProvider>
    )
}

function loadCss() {
    const lloyds = /\blloyds\b/;
    const bos = /\bbos\b/;
    const { hostname } = window.location;

    if (hostname.match(lloyds)) {
        brandCSS = LLOYDS;
        require(`@lbg/constellation/dist/${brandCSS}.css`);
    }
    else if (hostname.match(bos)) {
        brandCSS = BOS;
        require(`@lbg/constellation/dist/${brandCSS}.css`);
    }
    else {
        brandCSS = LLOYDS;
        require(`@lbg/constellation/dist/${brandCSS}.css`);
    }
}