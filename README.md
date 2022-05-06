# git-cm

git-cm is a command line tool to generate formatted git commit message.

Developer can customize config for commit message, or use the preset config.

If no customize config is provided, git-cm will use the preset config.

It will generate git commit message by a series of question(The preset question is type, scope, dese, detail).

And finally, git-cm will use this commit message to run `git commit -m "<msg>"`.

======================

Example message for preset config:
```
💡 feature(user): add user's avatar
```

You can create a json file named `gitcm.config.json` in the project's root directory, and add the custom config.

custom config example:
```
{
  "inputList": [
    "type",
    {
      "name": "scope",
      "type": "select",
      "optionList": [
        "user",
        "admin",
        "config",
        "other"
      ],
      "question": "Which part will be impacted by the commit?",
      "defaultValue": "",
      "template": "(<scope>)"
    },
    "desc": {
      "name": "desc",
      "type": "input",
      "question": "Input short description for the commit.",
      "validation": {
        "maxLength": 30,
        "required": true,
      }
    },
  ],
  "template": "<type><scope>: <desc>"
}
```

If the `item` of the `inputList` is a `string`, it will use the preset config by this `string` value.