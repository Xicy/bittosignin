import * as React from 'react';
import {
    FacebookIcon,
    FacebookShareButton,
    GooglePlusIcon,
    GooglePlusShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'react-share';

interface ShareButtonProps {
    /**
     * Link to be shared
     */
    url: string;
    /**
     * Title of social media
     */
    socialMedia: 'facebook' | 'twitter' | 'googleplus' | 'linkedin';
}

const getSocialMediaComponent = () => ({
    facebook: {
        Component: FacebookShareButton,
        Icon: FacebookIcon,
    },
    twitter: {
        Component: TwitterShareButton,
        Icon: TwitterIcon,
    },
    linkedin: {
        Component: LinkedinShareButton,
        Icon: LinkedinIcon,
    },
    googleplus: {
        Component: GooglePlusShareButton,
        Icon: GooglePlusIcon,
    },
});

class ShareButton extends React.PureComponent<ShareButtonProps> {
    public render() {
        const { url, socialMedia } = this.props;
        const { Component, Icon } = this.getSocialIcon(socialMedia);
        return (
            <Component url={url}>
                <Icon round={true} size={25} />
            </Component>
        );
    }

    private getSocialIcon(socialMedia) {
        return getSocialMediaComponent()[socialMedia];
    }
}

export {
    ShareButton,
    ShareButtonProps,
};
