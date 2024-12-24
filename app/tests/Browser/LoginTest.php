<?php

use Inertia\Testing\AssertableInertia as Assert;

test('example', function () {
    $this->get('/')->assertInertia(fn (Assert $assert) => $assert->component('Welcome')
        ->has('canLogin')
        ->has('canRegister'));
});
