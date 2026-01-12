+++
title = "Migrating Domains"
description = "From sh to dev"
date = "2026-01-11T16:42:11-07:00"
tags = [ "web", "linux" ]
+++

<!--toc:start-->

- [Setting the Scene](#setting-the-scene)
- [The Checklist](#the-checklist)

<!--toc:end-->

## Setting the Scene

I was recently on [Namecheap](https://www.namecheap.com/), my domain registrar
of choice, reviewing my domain [sua.sh](https://sua.sh) when one called
[sua.dev](https://sua.dev) caught my eye. This domain is particularly
attractive for three reasons: 1) my nickname is sữa (milk in Vietnamese), 2)
three letter domain names are aesthetically pleasing and rare, and 3) the `.dev`
top-level domain (TLD) is perfect for tech-focused blogs. I also learned that
the `.dev` TLD was [proposed by Google](https://get.dev/) back in 2019, which
isn't the selling point, but it's cool to see a big company like them behind it.

It wasn't cheap. For transparency, it is an $115 per year subscription. However,
compared to my previous subscription for sua.sh, which was about $50 per year, I
feel more in love with sua.dev. At the time, I don't believe that the sua.dev
was available, or else I would have gone with it. I figure that if I'm going to
be renting a domain, it better be one that I _actually_ like.

## The Checklist

Migrating domains is no simple task. I had emails, security keys, services,
documents, and more tied to my old email.

### Mail

I am using [Proton Mail](https://proton.me/mail) for my developer email.
Proton Mail allows you to use [custom
domains](https://proton.me/support/custom-domain) with their email if you have
the premium subscription. This is nice because I can use and share a more
personalized email that uses my own domain whilst enjoying all the features I
would expect from an email service.

After about half a year of experimenting, I may be canceling this subscription
and just using iCloud+'s [custom
domain](https://support.apple.com/en-us/102540) service. While I understand
Proton Mail's focus on privacy and security, but I don't think it it's worth the
$5 a month that I'm paying. I don't particularly use my personal or developer
email that often anyway. Moreover, I am already paying for iCloud+ for $2.99 a
month, so I should take advantage of this benefit!

Anyway, adding an updated email was pretty simple. Here are the steps:

In Proton Mail,

1. Navigate to Settings > Domain names
1. Delete the old domain (if applicable)
1. Click 'Add a Domain' and follow the instructions
1. Wait 30-60 minutes for DNS propagation
1. Navigate to Settings > Identity and addresses
1. Add the new address
1. Your new email (with your new domain) should be ready to use!

> In your domain registrar console, fill out all the records that Proton asks
> for. This allows for Proton to verify that you do, in fact, own the domain.
>
> You will be asked to create several CNAME, TXT, and MX records. All you have
> to do is copy and paste the values that Proton Mail tells you to.

### Security Keys

I am using [GPG](https://en.wikipedia.org/wiki/GNU_Privacy_Guard) to sign my
`git` commits. This lets me get nice [verified
commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)
which is 1) aesthetically pleasing and 2) gives myself and others a better sense
of peace that these code changes came from the correct person.

Updating the email for these GPG keys requires you some command line wrangling.
These are all of the commands necessary. The steps go something like this:

```bash
# list the keys
$ gpg -k

# edit the key
$ gpg --edit-key <THE_KEY_UNDER_QUESTION>

# list the existing uids on the key
$ list

# add a new uid on the key (follow the prompts)
$ adduid

# select the active uid
$ uid

# set the active uid to be the primary uid
$ primary

# delete the uid (optional)
$ deluid

# revoke the uid (but keep it) (optional)
$ revuid

# save the public key data into the clipboard
$ gpg --armor --export <YOUR_EMAIL> | wl-copy
```

Finally, we can copy the public key data and [save
it](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account)
to GitHub.

## Homelab

Most services running on my homelab are accessible through web interfaces. I
generally use this format: `service_name.sua.sh` so that it's easy to remember.
For example, my recipe manager [Mealie](https://mealie.io/) is reached through
`mealie.sua.sh`, but now I want to reach Mealie through `mealie.sua.dev`.

Running NixOS on my servers means that updating the domain was a one step
process. In fact, this is [the single
change](https://github.com/suasuasuasuasua/nixos-config/commit/09a138b08c8dc093c2cd41448e52f5660d151469)
that updated all my servers and laptops. Generating the SSL certificates is done
automatically as well using the [ACME
module](https://wiki.nixos.org/wiki/ACME), so all of these services are
reachable through `https://` prefixes. No scary warnings from the browser at
all!

> As an aside, SSL is enforced with no exceptions for `.dev` domains because it
> is included on the [HSTS preload list](https://hstspreload.org/).

All it takes is a simple `nixos-rebuild switch` and everything is back up and
running within the hour.
