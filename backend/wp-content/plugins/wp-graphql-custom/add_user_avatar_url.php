<?php
add_action('graphql_init', function () {
  $avatar = [
    'type' => 'String',
    'description' => __('Custom field for user mutations', 'wp-graphql'),
    'resolve' => function ($user) {
      $avatar = get_user_meta($user->userId, 'userAvatarUrl', true);
      return !empty($avatar) ? $avatar : [];
    },
  ];

  register_graphql_field('User', 'userAvatarUrl', $avatar);
  register_graphql_field('CreateUserInput', 'userAvatarUrl', $avatar);
  register_graphql_field('UpdateUserInput', 'userAvatarUrl', $avatar);
});

add_action('graphql_register_types', function () {

  register_graphql_mutation('testMutation', [
    'inputFields' => [
      'userAvatarUrl' => [
        'type' => ['non_null' => 'String'],
      ],
    ],
    'outputFields' => [
      'phoneNumber' => [
        'type' => 'String',
      ],
    ],
    'mutateAndGetPayload' => function ($input) {

      return [
        'userAvatarUrl' => $input['userAvatarUrl'] ?? null,
      ];

    }
  ]);

});

add_action('graphql_user_object_mutation_update_additional_data', 'graphql_register_user_mutation', 10, 5);

function graphql_register_user_mutation($user_id, $input, $mutation_name, $context, $info)
{
  if (isset($input['userAvatarUrl'])) {
    // Consider other sanitization if necessary and validation such as which
    // user role/capability should be able to insert this value, etc.
    update_user_meta($user_id, 'userAvatarUrl', $input['userAvatarUrl']);
  }
}
?>