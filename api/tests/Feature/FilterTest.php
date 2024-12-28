<?php


namespace Tests\Feature;

use App\Models\Event;
use App\Filters\EventFilter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Http\Request;
use Laravel\Scout\Searchable;

class FilterTest extends TestCase
{
    use RefreshDatabase;

    private EventFilter $filter;

    protected function setUp(): void
    {
        parent::setUp();
        $this->filter = new EventFilter();
    }

    public function test_filters_by_start_date()
    {
        $event1 = Event::factory()->create(['start_time' => '2024-01-01']);
        $event2 = Event::factory()->create(['start_time' => '2024-02-01']);

        $request = new Request(['start_time' => '2024-01-15']);
        $filtered = $this->filter->filter($request)->get();

        $this->assertCount(1, $filtered);
        $this->assertTrue($filtered->contains($event2));
    }

    public function test_filters_by_end_date()
    {
        $event1 = Event::factory()->create(['end_time' => '2024-03-01']);
        $event2 = Event::factory()->create(['end_time' => '2024-04-01']);

        $request = new Request(['end_time' => '2024-03-15']);
        $filtered = $this->filter->filter($request)->get();

        $this->assertCount(1, $filtered);
        $this->assertTrue($filtered->contains($event1));
    }

    public function test_filters_by_search_term()
    {

        Event::removeAllFromSearch();
        // Create test events
        $event1 = Event::factory()->create(['title' => 'Conference']);
        $event2 = Event::factory()->create(['title' => 'Meeting B']);

        $event1->searchable();
        $events = Event::factory()->count(3)->create();


        // Sync all at once
        Event::withoutSyncingToSearch(function () use ($events) {
            foreach ($events as $event) {
                $event->save();
            }
        });
        // Make sure search index is updated
        Event::makeAllSearchable();

        // Give time for search index to update
        sleep(1);

        // Test search filter
        $request = new Request(['search' => 'Conference']);
        $filtered = $this->filter->filter($request)->get();

        // Debug output
        if ($filtered->isEmpty()) {
            dump('No results found');
            dump('Search index status:', Event::search('Conference')->raw());
            dump('All events:', Event::all()->toArray());
        }

        $this->assertCount(1, $filtered);
        $this->assertTrue($filtered->contains($event1));
    }
}
