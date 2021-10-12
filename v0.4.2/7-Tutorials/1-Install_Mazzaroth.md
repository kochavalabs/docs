# Install Mazzaroth

Mazzaroth is provided as an image on [Docker Hub](https://hub.docker.com/r/kochavalabs/mazzaroth),
which means that it can be run on any platform.

All you will need to begin is to have Docker installed, which you can find [here](https://docs.docker.com/get-docker/).

## Pulling Image

You can install the latest version of the Mazzaroth Image by running the
[docker pull](https://docs.docker.com/engine/reference/commandline/pull/) command:

```Bash
docker pull kochavalabs/mazzaroth
```

If you would like to specify a specific version of Mazzaroth include the tag, i.e:

```Bash
docker pull kochavalabs/mazzaroth:0.2.0
```

You can find a list of the current image tags on [Docker Hub](https://hub.docker.com/r/kochavalabs/mazzaroth/tags).

## Running a Node

You can use the [docker run](https://docs.docker.com/engine/reference/commandline/run/)
command to create and start a container using the Mazzaroth image.

Running the Mazzaroth image with no arguments will list the usage information

Example:

```Bash
docker run kochavalabs/mazzaroth
```

```Bash
Mazzaroth allows you to start a server or interact as a client.

Usage:
  mazzaroth [command]

Available Commands:
  help        Help about any command
  start       Start the Mazzaroth RPC Server.

Flags:
      --config string   config file (default is config.yaml)
  -h, --help            help for mazzaroth

Use "mazzaroth [command] --help" for more information about a command.
```

Mazzaroth arguments and flags can be provided with the command to docker run.
For example, to get a listing of all of the available flags and descriptions for
the Mazzaroth start standalone command use:

```Bash
docker run kochavalabs/mazzaroth start standalone --help
```

There are a couple of options you will likely want to provide to the run command.
Examples are provided below.

### Setting HTTP Port

At the very least, to interact with a node you will want to expose the http port.
This can be done by using the [-p option](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose)
with the docker run command.
The default http port is 8081, but this can be changed by providing a flag to the
Mazzaroth command itself.

Using the default value with 8081 exposed:

```Bash
docker run -p 8081:8081 kochavalabs/mazzaroth start standalone
```

Providing a configured http port:

```Bash
docker run -p 8082:8082 kochavalabs/mazzaroth start standalone --http_port 8082
```

### Mounting the Data Directory

With the default docker run command Mazzaroth will write persistent state
data to the container itself. So if the container is brought down or restarted
then any data that was written will be lost. This might be okay if you are just
using a node for testing or development, but you may also want to persist data
so that a node can be restarted from an existing ledger.

You can bind host directories using the docker run [--mount](https://docs.docker.com/engine/reference/commandline/run/#add-bind-mounts-or-volumes-using-the---mount-flag)
option.

With the mount option using type `bind` set `src` to the absolute path of the
directory on your machine and set `dst` to `/data`, which is the default data
directory in the container's filesystem.

Example:

```Bash
docker run -p 8081:8081 --mount type=bind,src=/data,dst=/data kochavalabs/mazzaroth start standalone
```
