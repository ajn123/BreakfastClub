<?php

use Laravel\Dusk\Browser;

test('example', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/login')
            ->waitFor('.text-6xl', 10)
            ->assertSee('Your Expected Text Here');
    });
});
